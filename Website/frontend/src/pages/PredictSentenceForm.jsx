import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Autocomplete from '@mui/material/Autocomplete';
// Tema Dark dengan color palette baru
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f9b17a', // Orange accent - perbaikan typo
      light: '#ffc88a', // Lighter version
      dark: '#d98e4f', // Darker version
      contrastText: '#424769',
    },
    secondary: {
      main: '#676f9d', // Lavender blue
      light: '#8d95c3',
      dark: '#424769', // Deeper blue
      contrastText: '#ffffff',
    },
    background: {
      default: '#424769', // Dark navy blue
      paper: '#424769',  // Slightly lighter navy
      dropdown: '#424769', // Warna untuk dropdown menu
      card: 'rgba(66, 71, 105, 0.7)',  // Warna untuk card dengan transparansi
    },
    text: {
      primary: '#ffffff',
      secondary: '#c7cbe7', // Light lavender
      accent: '#f9b17a', // Assuming the correct orange color
    },
    divider: 'rgba(255, 255, 255, 0.07)',
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h3: {
      fontWeight: 600,
      letterSpacing: '0.5px',
      fontSize: '1.75rem',
      color: '#ffffff',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '0.5px',
      fontSize: '1.5rem',
      color: '#f9b17a',
      fontFamily: "'Montserrat', 'Poppins', sans-serif",
    },
    body1: {
      letterSpacing: '0.15px',
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
    body2: {
      letterSpacing: '0.15px',
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 600,
      letterSpacing: '1px',
      fontSize: '0.875rem',
      fontFamily: "'Montserrat', 'Poppins', sans-serif",
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '0.15px',
    },
    caption: {
      fontSize: '0.75rem',
      letterSpacing: '0.4px',
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #161e31 0%,#182033 50%, #141b2c 100%)',
          minHeight: '100vh',
          backgroundAttachment: 'fixed',
          '&:before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            opacity: 0.4,
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.05) 1%, transparent 5%),
              radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.03) 1%, transparent 5%)
            `,
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          },
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
            width: 8,
            borderRadius: 20,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: '2px solid #2b2b2b',
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
        },
        '@keyframes fadeIn': {
          '0%': {
            opacity: 0,
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        '@keyframes fadeUp': {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        '@keyframes pulseGlow': {
          '0%': {
            boxShadow: '0 0 0 0 rgba(249, 177, 122, 0.4)'
          },
          '70%': {
            boxShadow: '0 0 0 10px rgba(249, 177, 122, 0)'
          },
          '100%': {
            boxShadow: '0 0 0 0 rgba(249, 177, 122, 0)'
          }
        },
        '@keyframes shimmer': {
          '0%': {
            backgroundPosition: '-1000px 0'
          },
          '100%': {
            backgroundPosition: '1000px 0'
          }
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: '#424769',
          backgroundImage: 'linear-gradient(145deg, rgba(45, 50, 80, 0.9), rgba(66, 71, 105, 0.9))',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          borderRadius: 8,
          marginTop: 4,
        },
        option: {
          fontSize: '0.9rem',
          padding: '8px 16px',
          transition: 'background-color 0.15s ease',
          '&:hover': {
            backgroundColor: 'rgba(249, 177, 122, 0.08)',
          },
          '&[aria-selected="true"]': {
            backgroundColor: 'rgba(249, 177, 122, 0.15)',
            '&:hover': {
              backgroundColor: 'rgba(249, 177, 122, 0.25)',
            }
          }
        },
        listbox: {
          padding: 0,
          maxHeight: 280,
          scrollbarWidth: 'thin',
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar': {
            backgroundColor: '#2b2b2b',
            width: 8,
            borderRadius: 20,
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#6b6b6b',
            minHeight: 24,
            border: '2px solid #2b2b2b',
          },
        },
        endAdornment: {
          color: '#f9b17a',
        },
        popupIndicator: {
          color: '#ffffff',
          '&:hover': {
            background: 'rgba(249, 177, 122, 0.08)',
          }
        },
        clearIndicator: {
          color: '#c7cbe7',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 26px',
          boxShadow: 'none',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease-out',
          "&:hover": {
            boxShadow: '0 4px 15px rgba(249, 177, 122, 0.25)',
            transform: 'translateY(-2px)',
            "&:after": {
              opacity: 0.1,
            }
          },
          "&:after": {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)',
            opacity: 0,
            transition: 'opacity 0.3s ease-out',
          },
        },
        contained: {
          backgroundColor: '#f9b17a',
          color: '#424769',
          boxShadow: '0 2px 10px rgba(249, 177, 122, 0.2)',
          "&:hover": {
            backgroundColor: '#ffc88a',
            boxShadow: '0 5px 15px rgba(249, 177, 122, 0.4)',
          },
          "&:active": {
            boxShadow: '0 2px 10px rgba(249, 177, 122, 0.3)',
            transform: 'translateY(0px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 16,
          backgroundColor: '#424769',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
            background: 'radial-gradient(circle at top right, rgba(249, 177, 122, 0.1), transparent 20%), radial-gradient(circle at bottom left, rgba(103, 111, 157, 0.1), transparent 20%)',
            pointerEvents: 'none',
            opacity: 0.3,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: 'rgba(45, 50, 80, 0.7)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#f9b17a',
              borderWidth: '1px',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#f9b17a',
              boxShadow: '0 0 0 2px rgba(249, 177, 122, 0.2)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(45, 50, 80, 0.9)',
            }
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#f9b17a',
          },
          '& .MuiInputBase-input': {
            transition: 'background-color 0.3s ease',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'all 0.2s',
          '&:hover': {
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
          },
          '&.Mui-focused': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
          },
        },
        notchedOutline: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
          transition: 'all 0.2s',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          position: 'relative',
          '& .MuiTabs-indicator': {
            backgroundColor: '#f9b17a',
            height: '3px',
            borderRadius: '3px 3px 0 0',
          },
        },
        flexContainer: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '0.95rem',
          fontWeight: 500,
          letterSpacing: '0.3px',
          color: '#c7cbe7',
          transition: 'all 0.2s ease',
          '&.Mui-selected': {
            color: '#ffffff',
            fontWeight: 600,
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            color: '#ffffff',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          paddingRight: '32px',
          '&.MuiInputBase-input': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }
        },
        icon: {
          color: '#f9b17a',
          transition: 'transform 0.2s ease',
        },
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#424769',
          backgroundImage: 'linear-gradient(145deg, rgba(45, 50, 80, 0.9), rgba(66, 71, 105, 0.9))',
          backdropFilter: 'blur(10px)',
          maxHeight: 300,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          animation: 'fadeIn 0.2s ease',
          '& .MuiMenuItem-root': {
            fontSize: '0.9rem',
            padding: '8px 16px',
            transition: 'background-color 0.15s ease',
            '&:hover': {
              backgroundColor: 'rgba(249, 177, 122, 0.08)',
            },
            '&.Mui-selected': {
              backgroundColor: 'rgba(249, 177, 122, 0.15)',
              '&:hover': {
                backgroundColor: 'rgba(249, 177, 122, 0.25)',
              }
            }
          }
        },
        list: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '36px',
          color: '#f9b17a',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          animation: 'fadeUp 0.3s ease-out',
        },
        standardInfo: {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(66, 71, 105, 0.7)',
          '& .MuiAlert-icon': {
            color: '#f9b17a'
          }
        }
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(45, 50, 80, 0.9)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          fontSize: '0.75rem',
          padding: '8px 12px',
          maxWidth: 250,
        },
        arrow: {
          color: 'rgba(45, 50, 80, 0.9)',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(45, 50, 80, 0.8)',
          backdropFilter: 'blur(5px)',
        },
      },
    },
  },
});

// Data untuk dropdown
const KLASIFIKASI_PERKARA = [
  'Pencurian', 
  'Narkotika', 
  'Pembunuhan', 
  'Penggelapan', 
  'Penipuan',
  'Kekerasan Dalam Rumah Tangga',
  'Korupsi'
];

const NAMA_HAKIM = [
  'Dr. Budi Santoso, S.H., M.H.',
  'Dr. Siti Aminah, S.H., M.H.',
  'Dr. Ahmad Wijaya, S.H., M.H.',
  'Dr. Kartika Sari, S.H., M.H.',
  'Dr. Rahmat Hidayat, S.H., M.H.'
];

const NAMA_PENUNTUT_UMUM = [
  'Joko Widodo, S.H.',
  'Ratna Dewi, S.H.',
  'Bambang Supriyanto, S.H.',
  'Rina Mardiana, S.H.',
  'Agus Hermawan, S.H.'
];

const PASAL = [
  'Pasal 362 KUHP - Pencurian',
  'Pasal 363 KUHP - Pencurian dengan Pemberatan',
  'Pasal 372 KUHP - Penggelapan',
  'Pasal 378 KUHP - Penipuan',
  'Pasal 338 KUHP - Pembunuhan',
  'Pasal 340 KUHP - Pembunuhan Berencana',
  'Pasal 44 UU PKDRT - Kekerasan Fisik',
  'Pasal 2 UU Tipikor - Korupsi'
];

const SentencePredictionForm = () => {
  // State untuk tab aktif
  const [activeTab, setActiveTab] = useState(0);

  // State untuk menyimpan nilai input
  const [formValues, setFormValues] = useState({
    klasifikasiPerkara: '',
    namaHakim: '',
    namaPenuntutUmum: '',
    namaTerdakwa: '',
    jumlahSaksi: '',
    pasal: '',
    dakwaan: ''
  });

  // State untuk hasil prediksi
  const [prediction, setPrediction] = useState(null);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  // Handle perubahan tab
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle submit form
  const handleSubmit = () => {
    // Simulasi hasil prediksi (dalam kasus nyata, ini akan memanggil API)
    const randomMonths = Math.floor(Math.random() * 120) + 6; // 6 bulan hingga 10 tahun
    setPrediction(randomMonths);
    setActiveTab(1); // Pindah ke tab hasil
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
                  left: 0,
                  width: '50%',
                  height: '2px',
                  background: 'linear-gradient(90deg, #f9b17a, transparent)',
                  transition: 'width 0.3s ease',
                },
                '&:hover:after': {
                  width: '100%',
                }
              }}
            >
              <Box 
                component="div" 
                sx={{ 
                  mr: 1, 
                  width: 34, 
                  height: 34,
                  borderRadius: '50%',
                  backgroundColor: '#424769',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
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
              >
                <span style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>⚖</span>
              </Box>
              INDICTMENT
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 3,
          '& > *': {
            animation: 'fadeIn 0.6s ease-out'
          }
        }}
      >
        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: 5,
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '150px',
              height: '4px',
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
              mb: 1,
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

        <Paper 
          elevation={3} 
          sx={{ 
            p: 0,
            overflow: 'hidden',
            backgroundColor: '#2d3250',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3)',
              transform: 'translateY(-5px)',
            },
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            aria-label="prediksi tabs"
            sx={{ 
              px: 2, 
              pt: 2,
              '& .MuiTab-root': {
                transition: 'all 0.3s ease'
              },
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                opacity: 0.7,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
              }
            }}
            TabIndicatorProps={{
              sx: {
                height: 3,
                borderRadius: '3px 3px 0 0',
                background: 'linear-gradient(90deg, #f9b17a, #ffc88a)',
                boxShadow: '0 0 8px rgba(249, 177, 122, 0.5)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }
            }}
          >
            <Tab 
              label="Data Perkara" 
              icon={
                <Box 
                  component="span"
                  sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%',
                    backgroundColor: activeTab === 0 ? '#f9b17a' : 'rgba(255, 255, 255, 0.3)',
                    display: 'inline-block',
                    mr: 1,
                    transition: 'all 0.3s ease',
                    boxShadow: activeTab === 0 ? '0 0 8px rgba(249, 177, 122, 0.5)' : 'none'
                  }} 
                />
              }
              iconPosition="start"
            />
            <Tab 
              label="Hasil Prediksi" 
              disabled="True"
              icon={
                <Box 
                  component="span"
                  sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%',
                    backgroundColor: activeTab === 1 ? '#f9b17a' : 'rgba(255, 255, 255, 0.3)',
                    display: 'inline-block',
                    mr: 1,
                    transition: 'all 0.3s ease',
                    boxShadow: activeTab === 1 ? '0 0 8px rgba(249, 177, 122, 0.5)' : 'none'
                  }} 
                />
              }
              iconPosition="start"
            />
          </Tabs>

          <Box sx={{ p: 0 }}>
            {activeTab === 0 && (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: 4,
                  p: 4
                }}
              >
                <Box sx={{ mb: 1, position: 'relative', pt: 3 }}>
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      top: '-18px',
                      left: '50%',          // Ubah dari '50px' ke '50%'
                      transform: 'translateX(-50%)', // Tambahkan ini
                      backgroundColor: 'background.paper',
                      px: 2,
                      py: 0.5,
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      zIndex: 2,
                      mt: -0.5,     // Menambahkan margin top (setara dengan margin-top: 32px)
                      // mb: 4,
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
                          width: '60px',
                          height: '2px',
                          background: 'linear-gradient(90deg, transparent, rgba(249, 177, 122, 0.5), transparent)',
                          borderRadius: '2px',
                        }
                      }}
                    >
                      Lengkapi data kasus untuk melihat estimasi hukuman penjara. Hasil prediksi menggunakan model Deep Learning.
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
                      <Box 
                        sx={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(2, 1fr)', 
                          gap: 2,
                          // mb: 2
                        }}
                      >
                        {/* Klasifikasi Perkara */}
                        <Autocomplete
                          fullWidth
                          options={KLASIFIKASI_PERKARA}
                          value={formValues.klasifikasiPerkara || null}
                          onChange={(event, newValue) => {
                            setFormValues({
                              ...formValues,
                              klasifikasiPerkara: newValue || ''
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Klasifikasi Perkara"
                              name="klasifikasiPerkara"
                              sx={{ 
                                '& .MuiInputBase-root': {
                                  height: 56,
                                  backgroundColor: 'background.dropdown'
                                }
                              }}
                            />
                          )}
                          sx={{
                            '& .MuiAutocomplete-endAdornment': {
                              right: 8
                            }
                          }}
                        />

                        {/* Penuntut Umum */}
                        <Autocomplete
                          fullWidth
                          options={NAMA_PENUNTUT_UMUM}
                          value={formValues.namaPenuntutUmum || null}
                          onChange={(event, newValue) => {
                            setFormValues({
                              ...formValues,
                              namaPenuntutUmum: newValue || ''
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Penuntut Umum"
                              name="namaPenuntutUmum"
                              sx={{ 
                                '& .MuiInputBase-root': {
                                  height: 56,
                                  backgroundColor: 'background.dropdown'
                                }
                              }}
                            />
                          )}
                          sx={{
                            '& .MuiAutocomplete-endAdornment': {
                              right: 8
                            }
                          }}
                        />

                        {/* Nama Terdakwa */}
                        <Autocomplete
                          fullWidth
                          options={['John Doe', 'Jane Smith', 'Ahmad Abdullah', 'Rudi Setiawan']}
                          value={formValues.namaTerdakwa || null}
                          onChange={(event, newValue) => {
                            setFormValues({
                              ...formValues,
                              namaTerdakwa: newValue || ''
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Nama Terdakwa"
                              name="namaTerdakwa"
                              sx={{ 
                                '& .MuiInputBase-root': {
                                  height: 56,
                                  backgroundColor: 'background.dropdown'
                                }
                              }}
                            />
                          )}
                          sx={{
                            '& .MuiAutocomplete-endAdornment': {
                              right: 8
                            }
                          }}
                        />

                        {/* Hakim */}
                        <Autocomplete
                          fullWidth
                          options={NAMA_HAKIM}
                          value={formValues.namaHakim || null}
                          onChange={(event, newValue) => {
                            setFormValues({
                              ...formValues,
                              namaHakim: newValue || ''
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Hakim"
                              name="namaHakim"
                              sx={{ 
                                '& .MuiInputBase-root': {
                                  height: 56,
                                  backgroundColor: 'background.dropdown'
                                }
                              }}
                            />
                          )}
                          sx={{
                            '& .MuiAutocomplete-endAdornment': {
                              right: 8
                            }
                          }}
                        />
                      </Box>

                      <Box 
                        sx={{ 
                          display: 'grid', 
                          // Change from '1fr 1fr' (50%-50%) to '1fr 2fr' (33%-67%)
                          gridTemplateColumns: '1fr 7fr', 
                          gap: 2
                        }}
                      >
                        {/* Jumlah Saksi - Narrower */}
                        <TextField
                          fullWidth
                          label="Jumlah Saksi"
                          name="jumlahSaksi"
                          type="number"
                          value={formValues.jumlahSaksi}
                          onChange={handleChange}
                          InputProps={{
                            style: {
                              height: 56
                            }
                          }}
                          sx={{ 
                            '& .MuiInputBase-root': {
                              backgroundColor: 'background.dropdown'
                            }
                          }}
                        />
                        
                        {/* Pasal - Wider */}
                        <Autocomplete
                          fullWidth
                          options={PASAL}
                          value={formValues.pasal || null}
                          onChange={(event, newValue) => {
                            setFormValues({
                              ...formValues,
                              pasal: newValue || ''
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Pasal"
                              name="pasal"
                              sx={{ 
                                '& .MuiInputBase-root': {
                                  height: 56,
                                  backgroundColor: 'background.dropdown'
                                }
                              }}
                            />
                          )}
                          sx={{
                            '& .MuiAutocomplete-endAdornment': {
                              right: 8
                            }
                          }}
                        />
                      </Box>

                      <TextField
                        fullWidth
                        label="Dakwaan"
                        name="dakwaan"
                        multiline
                        rows={10}
                        value={formValues.dakwaan}
                        onChange={handleChange}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            padding: '14px 14px',
                            backgroundColor: 'background.dropdown'
                          }
                        }}
                      />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          onClick={handleSubmit}
                          sx={{ minWidth: 150 }}
                        >
                          PREDIKSI
                        </Button>
                      </Box>
                    
                  </Box>
                </Box>
              </Box>
            )}

            {activeTab === 1 && prediction && (
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
                    Estimasi Lama Hukuman:
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#f9b17a' }}>
                    {Math.floor(prediction / 12)} Tahun {prediction % 12} Bulan
                  </Typography>
                </Box>
                
                <Box sx={{ mt: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Hasil prediksi ini didasarkan pada analisis dari berbagai kasus serupa
                    dengan tingkat akurasi 85%. Hasil aktual dapat berbeda tergantung
                    berbagai faktor yang dipertimbangkan oleh hakim.
                  </Typography>
                    {/* Tombol untuk kembali ke tab Data Perkara */}
                    <Box sx={{ mt: 4 }}>
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        onClick={() => setActiveTab(0)}
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
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SentencePredictionForm;