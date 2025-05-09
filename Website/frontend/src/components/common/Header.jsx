import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const Header = ({ logoImage }) => {
  return (
    <Box 
      component="header" 
      sx={{ 
        py: 3, 
        px: 2,
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        }
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold', 
              display: 'flex',
              alignItems: 'center',
              color: '#fff',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -4,
                left: 50,
                top: 30,
                width: '70%',
                height: '1px',
                background: 'linear-gradient(300deg, #f9b17a, transparent)',
                transition: 'width 0.3s ease',
              }
            }}
          >
            <Box 
              component="div" 
              sx={{ 
                mr: 2, 
                width: 34, 
                height: 34,
                borderRadius: '50%',
                border: '1px solid rgb(255, 255, 255)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: `url(${logoImage})`,
                backgroundSize: '28px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.2), transparent)',
                  opacity: 0.6
                }
              }}
            />
            Hive Lab | Incarceration
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

Header.propTypes = {
  logoImage: PropTypes.string.isRequired,
};

export default Header;