import MapComponent from '@/components/MapComponent';
// import { sampleRouteData } from '@/mock/RSRP';
import { CellIDData } from '@/mock/CellID';

function AppLayout() {
  return <MapComponent points={CellIDData} discrete={true} valueKey="CellID" />;
  // return <MapComponent points={sampleRouteData} />;
}

export default AppLayout;
