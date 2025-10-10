"use client"

import React from "react"
import PropTypes from "prop-types"

export const ActiveFilters = ({ filters, onClearFilter, onClearAll }) => {
  // Check if any filters are active
  const hasActiveFilters = filters.search || (filters.status && filters.status !== "all") || filters.date_issued

  if (!hasActiveFilters) return null

  return (
    <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
      <span className="text-muted">Active filters:</span>

      {filters.search && (
        <div className="badge bg-light text-dark d-flex align-items-center p-2">
          <span>Search: {filters.search}</span>
          <button
            className="btn-close ms-2 btn-close-sm"
            onClick={() => onClearFilter("search")}
            aria-label="Clear search filter"
          ></button>
        </div>
      )}

      {filters.status && filters.status !== "all" && (
        <div className="badge bg-light text-dark d-flex align-items-center p-2">
          <span>Status: {filters.status}</span>
          <button
            className="btn-close ms-2 btn-close-sm"
            onClick={() => onClearFilter("status")}
            aria-label="Clear status filter"
          ></button>
        </div>
      )}

      {filters.date_issued && (
        <div className="badge bg-light text-dark d-flex align-items-center p-2">
          <span>Date: {filters.date_issued}</span>
          <button
            className="btn-close ms-2 btn-close-sm"
            onClick={() => onClearFilter("date_issued")}
            aria-label="Clear date filter"
          ></button>
        </div>
      )}

      {hasActiveFilters && (
        <button className="btn btn-sm btn-outline-secondary ms-auto" onClick={onClearAll}>
          Clear All
        </button>
      )}
    </div>
  )
}

ActiveFilters.propTypes = {
  filters: PropTypes.shape({
    search: PropTypes.string,
    status: PropTypes.string,
    date_issued: PropTypes.string
  }).isRequired,
  onClearFilter: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired
}
