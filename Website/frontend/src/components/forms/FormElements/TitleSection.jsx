import React from 'react';
import { Box, Typography } from '@mui/material';

const TitleSection = () => {
  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        mb: 5,
        mt: 5,
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '150px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(249, 177, 122, 0.5), transparent)',
          borderRadius: '4px',
        }
      }}
    >
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom
        sx={{
          background: 'linear-gradient(90deg, #f9b17a, #ffc88a)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textFillColor: 'transparent',
          display: 'inline-block',
          position: 'relative',
        }}
      >
        Prediksi Hukuman Penjara Berdasarkan Dakwaan
      </Typography>
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{
          maxWidth: '700px',
          mx: 'auto',
          fontSize: '0.95rem',
          letterSpacing: '0.3px',
          opacity: 0.85
        }}
      >
        Berbasis Natural Language Processing dan Deep Learning
      </Typography>
    </Box>
  );
};

export default TitleSection;