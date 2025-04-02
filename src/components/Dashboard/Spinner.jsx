
import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ colors }) => {
  const spinnerContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    fontFamily: "'Lexend', sans-serif",
    color: colors.darkGreen
  };

  const spinnerTextStyle = {
    marginTop: '15px',
    fontSize: '16px',
    fontWeight: '500'
  };

  return (
    <div style={spinnerContainerStyle}>
      <Spinner
        animation="border"
        role="status"
        style={{ 
          width: '3rem', 
          height: '3rem', 
          borderWidth: '0.25em',
          color: colors.orange,
          borderRightColor: 'transparent'
        }}
      />
      <div style={spinnerTextStyle}>Loading dashboard...</div>
    </div>
  );
};

export default LoadingSpinner;