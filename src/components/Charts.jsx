import React, { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import './Charts.css';

const Charts = ({ data }) => {
  const [activeTab, setActiveTab] = useState('download');

  // Process data for charts
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data
      .filter((item) => item.record_time)
      .sort((a, b) => new Date(a.record_time) - new Date(b.record_time))
      .map((item, index) => {
        const date = new Date(item.record_time);
        return {
          index: index + 1,
          timestamp: date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          fullTime: date,
          timeValue: date.getTime(), // For proper time-based x-axis
          download_rate: item.download_rate
            ? parseFloat(item.download_rate)
            : null,
          upload_rate: item.upload_rate ? parseFloat(item.upload_rate) : null,
          ping: item.ping ? parseFloat(item.ping) : null,
          sms_delivery_time: item.sms_delivery_time
            ? parseFloat(item.sms_delivery_time)
            : null,
          technology: item.technology || 'Unknown',
          location: `${item.lat?.toFixed(4)}, ${item.lng?.toFixed(4)}`,
          rsrp: item.rsrp,
          signal_strength: item.signal_strength,
        };
      });
  }, [data]);

  // Technology distribution for pie chart
  const technologyData = useMemo(() => {
    if (!chartData.length) return [];

    const techCount = chartData.reduce((acc, item) => {
      const tech = item.technology || 'Unknown';
      acc[tech] = (acc[tech] || 0) + 1;
      return acc;
    }, {});

    const colors = [
      '#3B82F6',
      '#EF4444',
      '#10B981',
      '#F59E0B',
      '#8B5CF6',
      '#EC4899',
    ];

    return Object.entries(techCount).map(([tech, count], index) => ({
      name: tech,
      value: count,
      percentage: ((count / chartData.length) * 100).toFixed(1),
      color: colors[index % colors.length],
    }));
  }, [chartData]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (chartData.length === 0) return {};

    const calcStats = (values) => {
      const validValues = values.filter(
        (v) => v !== null && v !== undefined && v > 0
      );
      if (validValues.length === 0) return { avg: 0, min: 0, max: 0, count: 0 };

      return {
        avg: validValues.reduce((a, b) => a + b, 0) / validValues.length,
        min: Math.min(...validValues),
        max: Math.max(...validValues),
        count: validValues.length,
      };
    };

    return {
      download: calcStats(chartData.map((d) => d.download_rate)),
      upload: calcStats(chartData.map((d) => d.upload_rate)),
      ping: calcStats(chartData.map((d) => d.ping)),
      sms: calcStats(chartData.map((d) => d.sms_delivery_time)),
    };
  }, [chartData]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="tooltip-time">{`Time: ${data.timestamp}`}</p>
          <p className="tooltip-value">{`${tabs.find((t) => t.id === activeTab)?.label}: ${payload[0].value?.toFixed(2) || 'N/A'} ${getUnit(activeTab)}`}</p>
          <p className="tooltip-tech">{`Technology: ${data.technology}`}</p>
          <p className="tooltip-location">{`Location: ${data.location}`}</p>
          {data.signal_strength && (
            <p className="tooltip-signal">{`Signal: ${data.signal_strength} dBm`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="chart-tooltip">
          <p className="tooltip-tech">{`${data.name}: ${data.value} samples`}</p>
          <p className="tooltip-value">{`${data.payload.percentage}% of total`}</p>
        </div>
      );
    }
    return null;
  };

  const getUnit = (metric) => {
    switch (metric) {
      case 'download':
      case 'upload':
        return 'Mbps';
      case 'ping':
      case 'sms':
        return 'ms';
      default:
        return '';
    }
  };

  const getMetricKey = (metric) => {
    switch (metric) {
      case 'download':
        return 'download_rate';
      case 'upload':
        return 'upload_rate';
      case 'ping':
        return 'ping';
      case 'sms':
        return 'sms_delivery_time';
      default:
        return 'download_rate';
    }
  };

  const getChartColor = (metric) => {
    switch (metric) {
      case 'download':
        return '#3B82F6';
      case 'upload':
        return '#EF4444';
      case 'ping':
        return '#10B981';
      case 'sms':
        return '#F59E0B';
      default:
        return '#3B82F6';
    }
  };

  const getGradientId = (metric) => {
    return `gradient-${metric}`;
  };

  const tabs = [
    { id: 'download', label: 'Download Rate', icon: '📥', unit: 'Mbps' },
    { id: 'upload', label: 'Upload Rate', icon: '📤', unit: 'Mbps' },
    { id: 'ping', label: 'Ping', icon: '🏓', unit: 'ms' },
    { id: 'sms', label: 'SMS Delivery', icon: '💬', unit: 'ms' },
  ];

  if (!data || data.length === 0) {
    return (
      <div className="charts-container">
        <div className="no-data-state">
          <div className="no-data-icon">📊</div>
          <h3 className="no-data-title">No Data Available</h3>
          <p className="no-data-subtitle">
            Select a session to view performance charts
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="charts-container">
      {/* Header with session info */}
      <div className="charts-header">
        <div className="session-info">
          <h2 className="charts-title">Performance Analytics</h2>
          <p className="session-details">
            {chartData.length} data points collected
          </p>
        </div>
        <div className="technology-summary">
          <div className="tech-pie-container">
            <h3 className="pie-title">Technology Distribution</h3>
            <ResponsiveContainer width={200} height={120}>
              <PieChart>
                <Pie
                  data={technologyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {technologyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {technologyData.map((entry, index) => (
                <div key={index} className="legend-item">
                  <div
                    className="legend-color"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="legend-text">
                    {entry.name} ({entry.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tabs-container">
        <div className="tabs-navigation">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Statistics Cards */}
          <div className="stats-grid">
            <div className="stat-card average">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-label">Average</div>
                <div className="stat-value">
                  {stats[activeTab]?.avg?.toFixed(2) || '0'}
                  <span className="stat-unit">{getUnit(activeTab)}</span>
                </div>
                <div className="stat-count">
                  {stats[activeTab]?.count || 0} samples
                </div>
              </div>
            </div>

            <div className="stat-card minimum">
              <div className="stat-icon">📉</div>
              <div className="stat-content">
                <div className="stat-label">Minimum</div>
                <div className="stat-value">
                  {stats[activeTab]?.min?.toFixed(2) || '0'}
                  <span className="stat-unit">{getUnit(activeTab)}</span>
                </div>
              </div>
            </div>

            <div className="stat-card maximum">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <div className="stat-label">Maximum</div>
                <div className="stat-value">
                  {stats[activeTab]?.max?.toFixed(2) || '0'}
                  <span className="stat-unit">{getUnit(activeTab)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Container */}
          <div className="chart-container">
            <div className="chart-header">
              <h3 className="chart-title">
                {tabs.find((t) => t.id === activeTab)?.label} Over Time
              </h3>
              <div className="chart-subtitle">
                Real-time performance metrics from your test drive
              </div>
            </div>

            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <defs>
                    <linearGradient
                      id={getGradientId(activeTab)}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={getChartColor(activeTab)}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={getChartColor(activeTab)}
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
                  <XAxis
                    dataKey="timestamp"
                    stroke="#64748b"
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickFormatter={(value, index) => {
                      // Show every 5th tick to avoid crowding
                      return index % 5 === 0 ? value : '';
                    }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    label={{
                      value: `${tabs.find((t) => t.id === activeTab)?.label} (${getUnit(activeTab)})`,
                      angle: -90,
                      position: 'insideLeft',
                      style: {
                        textAnchor: 'middle',
                        fill: '#374151',
                        fontWeight: '500',
                      },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey={getMetricKey(activeTab)}
                    stroke={getChartColor(activeTab)}
                    strokeWidth={3}
                    dot={{
                      fill: getChartColor(activeTab),
                      strokeWidth: 2,
                      r: 4,
                    }}
                    activeDot={{
                      r: 8,
                      stroke: getChartColor(activeTab),
                      strokeWidth: 3,
                      fill: '#ffffff',
                    }}
                    connectNulls={false}
                    fill={`url(#${getGradientId(activeTab)})`}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
