import { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, Tabs } from '@chakra-ui/react';

import MapComponent from '@/components/MapComponent';
import Sessions from '@/components/Sessions';
import Filters from '@/components/Filters';
import DataTable from '@/components/DataTable';

function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [driveData, setDriveData] = useState([]);
  const [discrete, setDiscrete] = useState(false);
  const [valueKey, setValueKey] = useState('rsrp_rscp');
  const [filters, setFilters] = useState([
    { id: 'rsrp-rscp', label: 'Show RSRP/RSCP', checked: true },
    { id: 'rsrq-ecn0', label: 'Show RSRQ/Ec-N0', checked: false },
    { id: 'cellid', label: 'Show Cell ID', checked: false },
    { id: 'lac-tac', label: 'Show LAC/TAC', checked: false },
  ]);

  // Fetch list of drives
  useEffect(() => {
    axios
      .get('http://localhost:8080/drive/all')
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

    axios
      .post('http://localhost:8080/drive/signals', {
        drive_id: selectedSessionId,
      })
      .then((response) => {
        const data = response.data;
        const transformed = data.map((item) => ({
          id: item.id,
          lat: item.latitude ?? 35.735069274902344,
          lng: item.longitude ?? 51.52555465698242,
          rsrp_rscp: `${item.rsrp} dbm`,
          rsrq_ecn0: `${item.rsrq} dB`,
          cellid: item.cell_id,
          tac_lac: item.tac,
          plmn_id: item.plmn_id,
          technology: item.technology,
          signal_strength: item.signal_strength,
          download_rate: item.download_rate,
          upload_rate: item.upload_rate,
          dns_lookup_time: item.dns_lookup_time,
          ping: item.ping,
          sms_delivery_time: item.sms_delivery_time,
          pci: item.pci,
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

    switch (selectedId) {
      case 'cellid':
        setDiscrete(true);
        setValueKey('cellid');
        break;
      case 'lac-tac':
        setDiscrete(true);
        setValueKey('tac_lac');
        break;
      case 'rsrq-ecn0':
        setDiscrete(false);
        setValueKey('rsrq_ecn0');
        break;
      default:
        setDiscrete(false);
        setValueKey('rsrp_rscp');
    }
  };

  return (
    <Flex>
      <Sessions
        sessions={sessions}
        selectedSessionId={selectedSessionId}
        setSession={setSelectedSessionId}
      />

      <Tabs.Root defaultValue="map">
        <Tabs.List h="6vh">
          <Tabs.Trigger value="map">Map</Tabs.Trigger>
          <Tabs.Trigger value="table">Table</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="map">
          <Flex>
            <MapComponent
              points={driveData}
              discrete={discrete}
              valueKey={valueKey}
            />
            <Filters filters={filters} onFilterChange={handleFilterChange} />
          </Flex>
        </Tabs.Content>

        <Tabs.Content value="table">
          <DataTable data={driveData} />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}

export default Dashboard;
