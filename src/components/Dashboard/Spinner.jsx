import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Dashboard.css';  

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <Spinner
        animation="border"
        role="status"
        className="custom-spinner"
        style={{ borderRightColor: 'transparent'}}
      />
      <div className="spinner-text">Brewing Dashboard...</div>
    </div>
  );
};

export default LoadingSpinner;