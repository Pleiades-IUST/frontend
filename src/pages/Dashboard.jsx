import { useState } from 'react';

import { Flex } from '@chakra-ui/react';

import MapComponent from '@/components/MapComponent';
import Sessions from '@/components/Sessions';
import Filters from '@/components/Filters';
import { DriveTestData } from '@/mock/Data';
import { sessionsData } from '@/mock/Sessions';

function Dashboard() {
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const [points, setPoints] = useState(DriveTestData);
  const [discrete, setDiscrete] = useState(false);
  const [valueKey, setValueKey] = useState('RSRP');

  const [filters, setFilters] = useState([
    { id: 'rsrp', label: 'Show Roads', checked: true },
    { id: 'buildings', label: 'Show Buildings', checked: false },
    { id: 'water', label: 'Show Water', checked: false },
    { id: 'parks', label: 'Show Parks', checked: false },
  ]);
  const handleFilterChange = (selectedId) => {
    setFilters((prev) =>
      prev.map((filter) => ({
        ...filter,
        checked: filter.id === selectedId,
      }))
    );
  };

  return (
    <Flex>
      <Sessions
        sessions={sessionsData}
        selectedSessionId={selectedSessionId}
        setSession={setSelectedSessionId}
      />
      <MapComponent points={points} discrete={discrete} valueKey={valueKey} />
      <Filters filters={filters} onFilterChange={handleFilterChange} />
    </Flex>
  );
}

export default Dashboard;
