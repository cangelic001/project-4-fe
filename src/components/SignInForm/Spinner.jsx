
import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
  const spinnerContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '15vh',
    fontFamily: "'Lexend', sans-serif"
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
          borderRightColor: 'transparent'
        }}
      />
      <div style={spinnerTextStyle}>Loading...</div>
    </div>
  );
};

export default LoadingSpinner;