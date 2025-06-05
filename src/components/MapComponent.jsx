import { Box } from '@chakra-ui/react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const defaultCenter = [35.77, 51.38];

const generateHslPalette = (uniqueValues) => {
  const n = uniqueValues.length;
  const colorMap = {};
  uniqueValues.forEach((val, i) => {
    const hue = Math.round((i * 360) / n);
    colorMap[val] = `hsl(${hue}, 70%, 50%)`;
  });
  return colorMap;
};

const MapComponent = ({
  width = '80vw',
  height = '60vh',
  center = defaultCenter,
  points = [],
  valueKey = 'cellId',
  discrete = false,
}) => {
  const normalizeKey = (point) => {
    const target = Object.keys(point).find(
      (k) => k.toLowerCase() === valueKey.toLowerCase()
    );
    return target || valueKey;
  };

  let getColorForValue;

  if (discrete) {
    const uniqueValues = [
      ...new Set(
        points
          .map((p) => {
            const k = normalizeKey(p);
            return p[k];
          })
          .filter((v) => v != null)
      ),
    ];
    const colorMap = generateHslPalette(uniqueValues);
    getColorForValue = (val) => colorMap[val] || '#000';
  } else {
    const numericValues = points
      .map((p) => {
        const k = normalizeKey(p);
        const v = p[k];
        if (typeof v === 'string' && v.toLowerCase().includes('dbm')) {
          return parseInt(v, 10);
        }
        return Number(v);
      })
      .filter((v) => !isNaN(v));
    const minValue = Math.min(...numericValues);
    const maxValue = Math.max(...numericValues);
    const range = maxValue - minValue || 1;

    getColorForValue = (val) => {
      if (typeof val === 'string' && val.toLowerCase().includes('dbm')) {
        val = parseInt(val, 10);
      } else {
        val = Number(val);
      }
      const t = (val - minValue) / range;
      const r = Math.round((1 - t) * 255);
      const g = Math.round(t * 255);
      return `rgb(${r}, ${g}, 0)`;
    };
  }

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
          const k = normalizeKey(point);
          const value = point[k];
          const color = getColorForValue(value);
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
                {`${valueKey}: ${value}`}
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </Box>
  );
};

export default MapComponent;
