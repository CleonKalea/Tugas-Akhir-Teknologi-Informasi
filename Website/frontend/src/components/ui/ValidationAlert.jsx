import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import PropTypes from 'prop-types';

const ValidationAlert = ({ open, message, onClose }) => {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={6000} 
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        onClose={onClose} 
        severity="error" 
        variant="filled"
        sx={{ 
          width: '100%',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          backgroundColor: 'rgba(185, 27, 27, 0.9)',
          backdropFilter: 'blur(10px)',
          '& .MuiAlert-icon': {
            color: '#ffffff'
          },
          fontWeight: 500
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

ValidationAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ValidationAlert;