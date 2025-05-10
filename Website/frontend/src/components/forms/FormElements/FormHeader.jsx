import React from 'react';
import { Box, Typography } from '@mui/material';

const FormHeader = () => {
  return (
    <>
      <Box 
        sx={{ 
          position: 'absolute',
          top: '-18px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'background.paper',
          px: 2,
          py: 0.5,
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          zIndex: 2,
          mt: 1,
        }}
      >
        <Box 
          component="span" 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: 'rgba(249, 177, 122, 0.2)',
            mr: 1.5,
            color: 'primary.main',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Box>
        <Typography 
          variant="subtitle1" 
          component="span" 
          sx={{ 
            fontWeight: 600,
            letterSpacing: '0.5px',
            color: 'primary.main',
          }}
        >
          INPUT DATA PERKARA
        </Typography>
      </Box>
      
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          mt: 1.5,
          textAlign: 'center',
          maxWidth: '90%',
          mx: 'auto',
          lineHeight: 1.6,
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '150px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(249, 177, 122, 0.5), transparent)',
            borderRadius: '2px',
          }
        }}
      >
        Lengkapi data kasus untuk mendapatkan estimasi hukuman penjara. Hasil prediksi diperoleh menggunakan model Deep Learning.
      </Typography>
    </>
  );
};

export default FormHeader;