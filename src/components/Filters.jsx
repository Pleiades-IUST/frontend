import React from 'react';
import './Filters.css';

const Filters = ({ filters, onFilterChange }) => {
  const continuousFilters = filters.filter((f) => f.type === 'continuous');
  const discreteFilters = filters.filter((f) => f.type === 'discrete');

  return (
    <aside className="filters-sidebar">
      <h3 className="filters-title">Data Visualization</h3>

      <div className="filter-section">
        <h4 className="filter-section-title">Signal & Performance Metrics</h4>
        <div className="checkbox-group">
          {continuousFilters.map((filter) => (
            <label key={filter.id} className="checkbox-item">
              <input
                type="radio"
                name="filter"
                checked={filter.checked}
                onChange={() => onFilterChange(filter.id)}
              />
              {filter.label}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-section-title">Network Information</h4>
        <div className="checkbox-group">
          {discreteFilters.map((filter) => (
            <label key={filter.id} className="checkbox-item">
              <input
                type="radio"
                name="filter"
                checked={filter.checked}
                onChange={() => onFilterChange(filter.id)}
              />
              {filter.label}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-legend">
        <h4 className="filter-section-title">Color Legend</h4>
        <div className="legend-item">
          <div className="legend-color-bar signal-gradient"></div>
          <span>Signal Quality: Red (Poor) → Green (Good)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color-bar latency-gradient"></div>
          <span>Latency: Green (Low) → Red (High)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color-bar throughput-gradient"></div>
          <span>Throughput: Blue (Low) → Red (High)</span>
        </div>
      </div>
    </aside>
  );
};

export default Filters;
