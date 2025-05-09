import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Container, Paper, Tabs, Tab } from '@mui/material';
import theme from '../../theme';
import logoImage from '../../assets/images/logo.png';
import Header from '../common/Header';
import TitleSection from './FormElements/TitleSection';
import DataForm from './FormElements/DataForm';
import ResultDisplay from './FormElements/ResultDisplay';
import ValidationAlert from '../ui/ValidationAlert';

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

  // State untuk validation alert
  const [validationAlert, setValidationAlert] = useState({
    open: false,
    message: ''
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

  // Handle perubahan Autocomplete
  const handleAutocompleteChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value || ''
    });
  };

  // Handle perubahan tab
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Close alert
  const handleCloseAlert = () => {
    setValidationAlert({
      ...validationAlert,
      open: false
    });
  };

  // Validasi form
  const validateForm = () => {
    // Check required fields
    const requiredFields = [
      { name: 'klasifikasiPerkara', label: 'Klasifikasi Perkara' },
      { name: 'namaHakim', label: 'Hakim' },
      { name: 'namaPenuntutUmum', label: 'Penuntut Umum' },
      { name: 'namaTerdakwa', label: 'Nama Terdakwa' },
      { name: 'jumlahSaksi', label: 'Jumlah Saksi' },
      { name: 'pasal', label: 'Pasal' },
      { name: 'dakwaan', label: 'Dakwaan' }
    ];
    
    // Check for empty fields
    const emptyFields = requiredFields.filter(field => !formValues[field.name]);
    
    if (emptyFields.length > 0) {
      // Get the names of empty fields
      const emptyFieldNames = emptyFields.map(field => field.label).join(', ');
      setValidationAlert({
        open: true,
        message: `Mohon isi data berikut: ${emptyFieldNames}`
      });
      return false;
    }
    
    return true;
  };

  // Handle submit form with validation
  const handleSubmit = () => {
    // Validate form fields
    if (!validateForm()) {
      return;
    }
    
    // All fields are filled, proceed with prediction
    const randomMonths = Math.floor(Math.random() * 120) + 6; // 6 bulan hingga 10 tahun
    setPrediction(randomMonths);
    setActiveTab(1); // Pindah ke tab hasil
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header logoImage={logoImage} />

      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 3,
          '& > *': {
            animation: 'fadeIn 0.6s ease-out'
          }
        }}
      >
        <TitleSection />

        <Paper 
          elevation={3} 
          sx={{ 
            p: 0,
            overflow: 'hidden',
            backgroundColor: '#2d3250',
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.05) 1%, transparent 3%),radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.03) 1%, transparent 5%)',
            backgroundSize: '50px 50px',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3)',
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
              disabled={true}
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
              <DataForm 
                formValues={formValues}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleAutocompleteChange={handleAutocompleteChange}
              />
            )}

            {activeTab === 1 && prediction && (
              <ResultDisplay 
                prediction={prediction} 
                onBack={() => setActiveTab(0)} 
              />
            )}
          </Box>
        </Paper>
      </Container>
      {/* Validation Alert Snackbar */}
      <ValidationAlert 
        open={validationAlert.open}
        message={validationAlert.message}
        onClose={handleCloseAlert}
      />
    </ThemeProvider>
  );
};

export default SentencePredictionForm;