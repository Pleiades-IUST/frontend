import React, { useState, useMemo } from 'react';
import './DataTable.css';

const DataTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Sort data
  const sortedData = useMemo(() => {
    if (!data) return [];

    let sortableData = [...data];

    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle null/undefined values
        if (aValue == null) aValue = '';
        if (bValue == null) bValue = '';

        // Handle numeric values
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc'
            ? aValue - bValue
            : bValue - aValue;
        }

        // Handle string values
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableData;
  }, [data, sortConfig]);

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchTerm) return sortedData;

    return sortedData.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedData, searchTerm]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return '⏸️';
    }
    return sortConfig.direction === 'asc' ? '🔼' : '🔽';
  };

  const formatValue = (key, value) => {
    if (value == null || value === undefined) return 'N/A';

    switch (key) {
      case 'record_time':
        return new Date(value).toLocaleString();
      case 'lat':
      case 'lng':
        return value.toFixed(6);
      case 'download_rate':
      case 'upload_rate':
        return `${value.toFixed(2)} Mbps`;
      case 'ping':
      case 'sms_delivery_time':
        return `${value} ms`;
      case 'signal_strength':
      case 'rsrp':
        return `${value} dBm`;
      default:
        return value;
    }
  };

  const getValueClass = (key, value) => {
    if (value == null || value === undefined) return 'cell-na';

    switch (key) {
      case 'download_rate':
      case 'upload_rate':
        if (value >= 50) return 'cell-excellent';
        if (value >= 25) return 'cell-good';
        if (value >= 10) return 'cell-average';
        return 'cell-poor';
      case 'ping':
        if (value <= 20) return 'cell-excellent';
        if (value <= 50) return 'cell-good';
        if (value <= 100) return 'cell-average';
        return 'cell-poor';
      case 'signal_strength':
      case 'rsrp':
        if (value >= -70) return 'cell-excellent';
        if (value >= -85) return 'cell-good';
        if (value >= -100) return 'cell-average';
        return 'cell-poor';
      default:
        return '';
    }
  };

  const columns = [
    { key: 'record_time', label: 'Record Time', icon: '🕐' },
    { key: 'lat', label: 'Latitude', icon: '🌍' },
    { key: 'lng', label: 'Longitude', icon: '🌍' },
    { key: 'technology', label: 'Technology', icon: '📡' },
    { key: 'rsrp_rscp', label: 'RSRP', icon: '📶' },
    { key: 'rsrq_ecn0', label: 'RSRQ', icon: '📶' },
    { key: 'tac_lac', label: 'TAC', icon: '🏷️' },
    { key: 'cellid', label: 'Cell ID', icon: '📍' },
    { key: 'signal_strength', label: 'Signal Strength', icon: '📡' },
    { key: 'download_rate', label: 'Download Rate', icon: '📥' },
    { key: 'upload_rate', label: 'Upload Rate', icon: '📤' },
    { key: 'ping', label: 'Ping', icon: '🏓' },
    { key: 'pci', label: 'PCI', icon: '🔢' },
    { key: 'sms_delivery_time', label: 'SMS Delivery', icon: '💬' },
  ];

  if (!data || data.length === 0) {
    return (
      <div className="table-container">
        <div className="no-data-state">
          <div className="no-data-icon">📊</div>
          <h3 className="no-data-title">No Data Available</h3>
          <p className="no-data-subtitle">
            Select a session to view detailed data
          </p>
        </div>
        {/* Render pagination even when no data or single page for consistency */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            ← Previous
          </button>

          <div className="pagination-info">
            <span className="page-numbers">
              {/* Only render page buttons if totalPages > 0 */}
              {totalPages > 0 ? (
                Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                    >
                      {pageNum}
                    </button>
                  );
                })
              ) : (
                <span className="page-btn active">1</span>
              )}{' '}
              {/* Show page 1 if no pages */}
            </span>
            <span className="pagination-text">
              Page {currentPage} of {totalPages === 0 ? 1 : totalPages}{' '}
              {/* Show '1' if totalPages is 0 */}
            </span>
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      {/* Header */}
      <div className="table-header">
        <div className="header-info">
          <h2 className="table-title">Data Analysis</h2>
          <p className="table-subtitle">
            {filteredData.length} of {data.length} records
            {searchTerm && ` (filtered by "${searchTerm}")`}
          </p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-icon">📊</span>
            <span className="stat-text">Total Records: {data.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📍</span>
            <span className="stat-text">
              Technologies:{' '}
              {
                [...new Set(data.map((d) => d.technology).filter(Boolean))]
                  .length
              }
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="table-controls">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search across all columns..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="search-clear">
              ✕
            </button>
          )}
        </div>

        <div className="pagination-controls">
          <label className="items-per-page">
            Show:
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="items-select"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className={`sortable ${sortConfig.key === column.key ? 'sorted' : ''}`}
                >
                  <div className="header-content">
                    <span className="header-icon">{column.icon}</span>
                    <span className="header-text">{column.label}</span>
                    <span className="sort-icon">{getSortIcon(column.key)}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? 'row-even' : 'row-odd'}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`table-cell ${getValueClass(column.key, item[column.key])}`}
                  >
                    {formatValue(column.key, item[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination - Always visible now */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          ← Previous
        </button>

        <div className="pagination-info">
          <span className="page-numbers">
            {/* Render page numbers as before */}
            {totalPages > 0 ? (
              Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                  >
                    {pageNum}
                  </button>
                );
              })
            ) : (
              <span className="page-btn active">1</span>
            )}{' '}
            {/* Show page 1 if totalPages is 0 */}
          </span>
          <span className="pagination-text">
            Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
          </span>
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || totalPages === 0} // Disable if no pages
          className="pagination-btn"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default DataTable;
