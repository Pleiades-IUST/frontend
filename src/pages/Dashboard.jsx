import { useState } from 'react';

import { Flex, Tabs } from '@chakra-ui/react';

import MapComponent from '@/components/MapComponent';
import Sessions from '@/components/Sessions';
import Filters from '@/components/Filters';
import { DriveTestData } from '@/mock/Data';
import { sessionsData } from '@/mock/Sessions';
import DataTable from '@/components/DataTable';

function Dashboard() {
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const [discrete, setDiscrete] = useState(false);
  const [valueKey, setValueKey] = useState('RSRP');

  const [filters, setFilters] = useState([
    { id: 'rsrp-rscp', label: 'Show RSRP/RSCP', checked: true },
    { id: 'rsrq-ecn0', label: 'Show RSRQ/Ec-N0', checked: false },
    { id: 'cellid', label: 'Show Cell ID', checked: false },
    { id: 'lac-tac', label: 'Show LAC/TAC', checked: false },
  ]);

  const handleFilterChange = (selectedId) => {
    setFilters((prev) =>
      prev.map((filter) => ({
        ...filter,
        checked: filter.id === selectedId,
      }))
    );

    if (selectedId === 'cellid') {
      setDiscrete(true);
      setValueKey('CellID');
    } else if (selectedId === 'lac-tac') {
      setDiscrete(true);
      setValueKey('TAC');
    } else if (selectedId === 'rsrp-rscp') {
      setDiscrete(false);
      setValueKey('RSRP');
    } else if (selectedId === 'rsrq-ecn0') {
      setDiscrete(false);
      setValueKey('RSRQ');
    }
  };

  return (
    <Flex>
      <Sessions
        sessions={sessionsData}
        selectedSessionId={selectedSessionId}
        setSession={setSelectedSessionId}
      />

      <Tabs.Root defaultValue="map">
        <Tabs.List h={'6vh'}>
          <Tabs.Trigger value="map">Map</Tabs.Trigger>
          <Tabs.Trigger value="table">Table</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="map">
          <Flex>
            <MapComponent
              points={DriveTestData}
              discrete={discrete}
              valueKey={valueKey}
            />
            <Filters filters={filters} onFilterChange={handleFilterChange} />
          </Flex>
        </Tabs.Content>
        <Tabs.Content value="table">
          <DataTable data={DriveTestData} />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}

export default Dashboard;
