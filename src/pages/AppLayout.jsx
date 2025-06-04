import MapComponent from '@/components/MapComponent';
import { sampleRouteData } from '@/mock/RSRP';

function AppLayout() {
  return <MapComponent points={sampleRouteData} />;
}

export default AppLayout;
