import React from 'react';
import './Filters.css';

const Filters = ({ filters, onFilterChange }) => {
  return (
    <aside className="filters-sidebar">
      <h3 className="filters-title">Filters</h3>
      <div className="checkbox-group">
        {filters.map((filter) => (
          <label key={filter.id} className="checkbox-item">
            <input
              type="checkbox"
              checked={filter.checked}
              onChange={() => onFilterChange(filter.id)}
            />
            {filter.label}
          </label>
        ))}
      </div>
    </aside>
  );
};

export default Filters;
