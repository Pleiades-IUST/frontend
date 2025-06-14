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

const getDisplayName = (key) => {
  const displayNames = {
    rsrp: 'RSRP (dBm)',
    rsrq: 'RSRQ (dB)',
    signal_strength: 'Signal Strength (dBm)',
    download_rate: 'Download Rate (Mbps)',
    upload_rate: 'Upload Rate (Mbps)',
    ping: 'Ping (ms)',
    sms_delivery_time: 'SMS Delivery (ms)',
    technology: 'Technology',
    cellid: 'Cell ID',
    tac_lac: 'TAC',
    pci: 'PCI',
    plmn_id: 'PLMN ID',
  };

  return displayNames[key] || key.toUpperCase();
};

const formatValue = (value, key) => {
  if (value === null || value === undefined) return 'N/A';

  switch (key) {
    case 'rsrp':
    case 'rsrq':
    case 'signal_strength':
      return `${value} dBm`;
    case 'download_rate':
    case 'upload_rate':
      return `${Number(value).toFixed(2)} Mbps`;
    case 'ping':
    case 'sms_delivery_time':
      return `${value} ms`;
    default:
      return value;
  }
};

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
  rsrp: { min: -120, max: -60 },
  rsrq: { min: -20, max: -3 },
  signal_strength: { min: -120, max: -60 },
  download_rate: { min: 0, max: 500 },
  upload_rate: { min: 0, max: 200 },
  ping: { min: 0, max: 1000 },
  sms_delivery_time: { min: 0, max: 2000 },
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
            .filter((v) => v != null && v !== undefined)
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
          return Number(val);
        })
        .filter((val) => !isNaN(val) && val !== null && val !== undefined);

      if (numericValues.length > 0) {
        minValue = Math.min(...numericValues);
        maxValue = Math.max(...numericValues);
      } else {
        minValue = 0;
        maxValue = 1;
      }
    }

    return { min: minValue, max: maxValue };
  }, [points, valueKey, discrete]);

  const getColorForValue = (val) => {
    if (discrete) return colorMap[val] || '#000';

    // Handle null values
    if (val === null || val === undefined) return '#888';

    const range = max - min || 1;
    let num = Number(val);
    if (isNaN(num)) num = min;
    if (num < min) num = min;
    if (num > max) num = max;

    const t = (num - min) / range;

    // Use different color schemes based on the metric type
    if (
      valueKey === 'rsrp' ||
      valueKey === 'rsrq' ||
      valueKey === 'signal_strength'
    ) {
      // For signal metrics: red (bad) to green (good)
      const r = Math.round((1 - t) * 255);
      const g = Math.round(t * 255);
      return `rgb(${r}, ${g}, 0)`;
    } else if (valueKey === 'ping' || valueKey === 'sms_delivery_time') {
      // For latency metrics: green (low) to red (high)
      const r = Math.round(t * 255);
      const g = Math.round((1 - t) * 255);
      return `rgb(${r}, ${g}, 0)`;
    } else {
      // For throughput metrics: blue to red scale
      const r = Math.round(t * 255);
      const b = Math.round((1 - t) * 255);
      return `rgb(${r}, 0, ${b})`;
    }
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
              <div>
                <div>
                  <strong>{getDisplayName(valueKey)}:</strong>{' '}
                  {formatValue(value, valueKey)}
                </div>
                <div>
                  <strong>Technology:</strong> {point.technology}
                </div>
                <div>
                  <strong>Signal Strength:</strong> {point.signal_strength} dBm
                </div>
                <div>
                  <strong>Cell ID:</strong> {point.cellid}
                </div>
                <div>
                  <strong>Location:</strong> {point.lat?.toFixed(6)},{' '}
                  {point.lng?.toFixed(6)}
                </div>
                <div>
                  <strong>Time:</strong>{' '}
                  {new Date(point.record_time).toLocaleTimeString()}
                </div>
              </div>
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
    // Direct mapping for exact matches
    if (Object.prototype.hasOwnProperty.call(point, valueKey)) {
      return valueKey;
    }

    // Fallback to fuzzy matching
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
