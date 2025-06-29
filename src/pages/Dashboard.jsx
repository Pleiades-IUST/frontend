import { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, Tabs } from '@chakra-ui/react'; // Assuming Chakra UI components are available

import MapComponent from '@/components/MapComponent';
import Sessions from '@/components/Sessions';
import Filters from '@/components/Filters';
import DataTable from '@/components/DataTable';
import Charts from '@/components/Charts';

// Import the new Dashboard CSS
import './Dashboard.css';

function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [driveData, setDriveData] = useState([]);
  const [discrete, setDiscrete] = useState(false);
  const [valueKey, setValueKey] = useState('rsrp');
  const [filters, setFilters] = useState([
    { id: 'rsrp', label: 'Show RSRP (dBm)', checked: true, type: 'continuous' },
    { id: 'rsrq', label: 'Show RSRQ (dB)', checked: false, type: 'continuous' },
    {
      id: 'signal_strength',
      label: 'Show Signal Strength',
      checked: false,
      type: 'continuous',
    },
    {
      id: 'download_rate',
      label: 'Show Download Rate',
      checked: false,
      type: 'continuous',
    },
    {
      id: 'upload_rate',
      label: 'Show Upload Rate',
      checked: false,
      type: 'continuous',
    },
    { id: 'ping', label: 'Show Ping (ms)', checked: false, type: 'continuous' },
    {
      id: 'sms_delivery_time',
      label: 'Show SMS Delivery Time',
      checked: false,
      type: 'continuous',
    },
    {
      id: 'technology',
      label: 'Show Technology',
      checked: false,
      type: 'discrete',
    },
    { id: 'cellid', label: 'Show Cell ID', checked: false, type: 'discrete' },
    { id: 'tac_lac', label: 'Show TAC', checked: false, type: 'discrete' },
    { id: 'pci', label: 'Show PCI', checked: false, type: 'discrete' },
    { id: 'plmn_id', label: 'Show PLMN ID', checked: false, type: 'discrete' },
  ]);

  // Fetch list of drives
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://103.75.197.188:8080/drive/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setSessions(data);
        if (data.length > 0) {
          setSelectedSessionId(data[0].id);
        }
      })
      .catch((err) => console.error('Failed to fetch sessions:', err));
  }, []);

  // Fetch drive signals when a session is selected (POST with request body)
  useEffect(() => {
    if (!selectedSessionId) return;

    const token = localStorage.getItem('token');
    axios
      .post(
        'http://103.75.197.188:8080/drive/signals',
        { drive_id: selectedSessionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        const transformed = data.map((item) => ({
          id: item.id,
          lat: item.latitude ?? 35.735069274902344,
          lng: item.longitude ?? 51.52555465698242,
          rsrp: item.rsrp,
          rsrq: item.rsrq,
          signal_strength: item.signal_strength,
          download_rate: item.download_rate,
          upload_rate: item.upload_rate,
          ping: item.ping,
          sms_delivery_time: item.sms_delivery_time,
          technology: item.technology,
          cellid: item.cell_id,
          tac_lac: item.tac,
          pci: item.pci,
          plmn_id: item.plmn_id,
          rsrp_rscp: item.rsrp ? `${item.rsrp} dbm` : 'N/A',
          rsrq_ecn0: `${item.rsrq} dB`,
          dns_lookup_time: item.dns_lookup_time,
          record_time: item.record_time,
        }));
        setDriveData(transformed);
      })
      .catch((err) => {
        console.error('Failed to fetch drive signals:', err);
        setDriveData([]);
      });
  }, [selectedSessionId]);

  const handleFilterChange = (selectedId) => {
    setFilters((prev) =>
      prev.map((filter) => ({ ...filter, checked: filter.id === selectedId }))
    );

    const selectedFilter = filters.find((f) => f.id === selectedId);
    if (selectedFilter) {
      setDiscrete(selectedFilter.type === 'discrete');
      setValueKey(selectedId);
    }
  };

  return (
    <Flex className="dashboard-container">
      <Sessions
        sessions={sessions}
        selectedSessionId={selectedSessionId}
        setSession={setSelectedSessionId}
      />

      <Tabs.Root defaultValue="map" className="main-content-area">
        <Tabs.List className="dashboard-tabs-list">
          <Tabs.Trigger value="map" className="dashboard-tab-trigger">
            Map
          </Tabs.Trigger>
          <Tabs.Trigger value="charts" className="dashboard-tab-trigger">
            Charts
          </Tabs.Trigger>
          <Tabs.Trigger value="table" className="dashboard-tab-trigger">
            Table
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content
          value="map"
          className="dashboard-tab-content map-tab-content"
        >
          <Flex className="map-filters-flex">
            <MapComponent
              points={driveData}
              discrete={discrete}
              valueKey={valueKey}
            />
            <Filters filters={filters} onFilterChange={handleFilterChange} />
          </Flex>
        </Tabs.Content>

        <Tabs.Content
          value="charts"
          className="dashboard-tab-content charts-tab-content"
        >
          <Charts data={driveData} />
        </Tabs.Content>

        <Tabs.Content
          value="table"
          className="dashboard-tab-content table-tab-content"
        >
          <DataTable data={driveData} />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}

export default Dashboard;
