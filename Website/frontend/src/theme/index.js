import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f9b17a', // Orange accent
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
      accent: '#f9b17a', // Orange accent color
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

export default theme;