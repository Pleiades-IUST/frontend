import MapComponent from '@/components/MapComponent';
// import { sampleRouteData } from '@/mock/RSRP';
import { CellIDData } from '@/mock/CellID';

function Dashboard() {
  return <MapComponent points={CellIDData} discrete={true} valueKey="CellID" />;
  //   return <MapComponent points={sampleRouteData} valueKey="RSRP" />;
}

export default Dashboard;
