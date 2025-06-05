import { useState } from 'react';

import MapComponent from '@/components/MapComponent';
// import { sampleRouteData } from '@/mock/RSRP';
import { CellIDData } from '@/mock/CellID';

function Dashboard() {
  const [points, setPoints] = useState(CellIDData);
  const [discrete, setDiscrete] = useState(true);
  const [valueKey, setValueKey] = useState('CellID');

  return (
    <MapComponent points={points} discrete={discrete} valueKey={valueKey} />
  );
}

export default Dashboard;
