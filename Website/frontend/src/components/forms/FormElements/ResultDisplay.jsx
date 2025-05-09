import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

const ResultDisplay = ({ prediction, onBack }) => {
  return (
    <Box sx={{ 
      p: 4, 
      textAlign: 'center',
      backgroundImage: 'radial-gradient(rgba(249, 177, 122, 0.1) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      borderRadius: 2,
      mb: 2
    }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2, color: '#f9b17a' }}>
        HASIL PREDIKSI
      </Typography>
      
      <Box 
        sx={{ 
          p: 3, 
          backgroundColor: 'rgba(249, 177, 122, 0.15)', 
          borderRadius: 2,
          display: 'inline-block',
          minWidth: 250,
          position: 'relative',
          border: '1px solid rgba(249, 177, 122, 0.3)',
          margin: '0 auto',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography variant="body1" component="div" color="text.secondary" gutterBottom>
          Estimasi Lama Hukuman
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#f9b17a' }}>
          {Math.floor(prediction / 12)} Tahun {prediction % 12} Bulan 15 Hari
        </Typography>
      </Box>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Hasil prediksi ini didasarkan pada analisis dari berbagai kasus serupa
          dengan tingkat akurasi 85%. Hasil aktual dapat berbeda tergantung
          berbagai faktor yang dipertimbangkan oleh hakim.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={onBack}
            sx={{ 
              minWidth: 200,
              borderWidth: '1px',
              borderColor: 'rgba(249, 177, 122, 0.5)',
              '&:hover': {
                borderColor: '#f9b17a',
                backgroundColor: 'rgba(249, 177, 122, 0.08)',
              }
            }}
          >
            KEMBALI KE DATA PERKARA
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

ResultDisplay.propTypes = {
  prediction: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired
};

export default ResultDisplay;