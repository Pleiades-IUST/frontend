import { Box } from '@chakra-ui/react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const defaultCenter = [35.6892, 51.389];

const MapComponent = ({
  width = '80vw',
  height = '60vh',
  center = defaultCenter,
  points = [],
}) => {
  const rsrpValues = points.map((p) => parseInt(p.RSRP, 10));
  const minRsrp = Math.min(...rsrpValues);
  const maxRsrp = Math.max(...rsrpValues);
  const range = maxRsrp - minRsrp || 1;

  const getColorForRsrp = (rsrpString) => {
    const value = parseInt(rsrpString, 10);
    const t = (value - minRsrp) / range;
    const r = Math.round((1 - t) * 255);
    const g = Math.round(t * 255);
    return `rgb(${r}, ${g}, 0)`;
  };

  return (
    <Box
      width={width}
      height={height}
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="md"
    >
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((point, idx) => {
          const color = getColorForRsrp(point.RSRP);
          return (
            <CircleMarker
              key={idx}
              center={[point.lat, point.lng]}
              radius={6}
              fillColor={color}
              fillOpacity={0.8}
              stroke={false}
            >
              <Tooltip
                direction="top"
                offset={[0, -6]}
                opacity={1}
                permanent={false}
              >
                {`RSRP: ${point.RSRP}`}
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </Box>
  );
};

export default MapComponent;
