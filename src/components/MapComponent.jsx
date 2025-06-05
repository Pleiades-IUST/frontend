import { Box } from '@chakra-ui/react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  LayerGroup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react';

const defaultCenter = [35.6892, 51.389];

const generateHslPalette = (uniqueValues) => {
  const n = uniqueValues.length;
  const colorMap = {};
  uniqueValues.forEach((val, i) => {
    const hue = Math.round((i * 360) / n);
    colorMap[val] = `hsl(${hue}, 70%, 50%)`;
  });
  return colorMap;
};

const thresholds = {
  RSRP: { min: -110, max: -40 },
  RSRQ: { min: -20, max: -3 },
};

const PointsLayer = ({ points, valueKey, discrete, normalizeKey }) => {
  const colorMap = useMemo(() => {
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
      return generateHslPalette(uniqueValues);
    }
    return null;
  }, [points, valueKey, discrete]);

  const { min, max } = useMemo(() => {
    if (discrete) return {};

    const threshold = thresholds[valueKey] || {};
    let minValue = threshold.min;
    let maxValue = threshold.max;

    const hasThreshold = minValue != null && maxValue != null;

    if (!hasThreshold) {
      const numericValues = points
        .map((p) => {
          const k = normalizeKey(p);
          const val = p[k];
          if (
            typeof val === 'string' &&
            (val.toLowerCase().includes('dbm') ||
              val.toLowerCase().includes('db'))
          ) {
            return parseInt(val, 10);
          }
          return Number(val);
        })
        .filter((val) => !isNaN(val));
      minValue = Math.min(...numericValues);
      maxValue = Math.max(...numericValues);
    }

    return { min: minValue, max: maxValue };
  }, [points, valueKey, discrete]);

  const getColorForValue = (val) => {
    if (discrete) return colorMap[val] || '#000';

    const range = max - min || 1;
    let num =
      typeof val === 'string' &&
      (val.toLowerCase().includes('dbm') || val.toLowerCase().includes('db'))
        ? parseInt(val, 10)
        : Number(val);
    if (isNaN(num)) num = min;
    if (num < min) num = min;
    if (num > max) num = max;

    const t = (num - min) / range;
    const r = Math.round((1 - t) * 255);
    const g = Math.round(t * 255);
    return `rgb(${r}, ${g}, 0)`;
  };

  return (
    <LayerGroup key={valueKey}>
      {points.map((point, idx) => {
        const k = normalizeKey(point);
        const value = point[k];
        const color = getColorForValue(value);

        return (
          <CircleMarker
            key={`${valueKey}-${idx}`}
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
    </LayerGroup>
  );
};

const MapComponent = ({
  width = '60vw',
  height = '84vh',
  center = defaultCenter,
  points,
  valueKey,
  discrete,
}) => {
  const normalizeKey = (point) => {
    const target = Object.keys(point).find((k) =>
      k.toLowerCase().includes(valueKey.toLowerCase())
    );
    return target || valueKey;
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
        <PointsLayer
          points={points}
          valueKey={valueKey}
          discrete={discrete}
          normalizeKey={normalizeKey}
        />
      </MapContainer>
    </Box>
  );
};

export default MapComponent;
