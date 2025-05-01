import React from "react"
import PropTypes from "prop-types"

export const LoadingSpinner = ({ isLoading }) => {
  if (!isLoading) return null

  return (
    <div className="d-flex justify-content-center my-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool.isRequired
}
