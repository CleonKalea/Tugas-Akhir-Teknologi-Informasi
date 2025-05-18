import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box, Container, Paper, Tabs, Tab, CircularProgress } from '@mui/material';
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
  
  // State untuk menyimpan nilai input (ID/values untuk backend)
  const [formValues, setFormValues] = useState({
    klasifikasiPerkara: '',
    namaHakim: '',
    namaPenuntutUmum: '',
    namaTerdakwa: '',
    jumlahSaksi: '',
    pasal: '',
    dakwaan: ''
  });
  
  // State untuk menyimpan display names
  const [formDisplayNames, setFormDisplayNames] = useState({
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
  
  // State untuk data dari API
  const [backendData, setBackendData] = useState(null);
  
  // State untuk loading
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk max hukuman berdasarkan pasal
  const [maxHukuman, setMaxHukuman] = useState(null);
  
  // Fetch data dari backend saat komponen dimount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/data');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBackendData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setValidationAlert({
          open: true,
          message: 'Gagal mengambil data dari server. Silakan coba lagi nanti.'
        });
      }
    };
    
    fetchData();
  }, []);
  
  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update formValues
    setFormValues({
      ...formValues,
      [name]: value
    });
    
    // Update formDisplayNames for text fields
    setFormDisplayNames({
      ...formDisplayNames,
      [name]: value
    });
  };
  
  // Handle perubahan Autocomplete
  const handleAutocompleteChange = (name, value, displayName) => {
    // Penanganan khusus untuk maxHukuman (bukan field form)
    if (name === 'maxHukuman') {
      setMaxHukuman(value);
      return;
    }
    
    // Update formValues (ID atau value asli)
    setFormValues({
      ...formValues,
      [name]: value || ''
    });
    
    // Update formDisplayNames jika displayName disediakan
    if (displayName !== undefined) {
      setFormDisplayNames({
        ...formDisplayNames,
        [name]: displayName
      });
    }
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
  const handleSubmit = async () => {
    // Validate form fields
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Format data untuk backend
    const predictionData = {
      klasifikasiPerkara: formValues.klasifikasiPerkara.id, // ID sudah tersimpan langsung
      penuntutUmum: formValues.namaPenuntutUmum.id, // ID sudah tersimpan langsung
      hakim: formValues.namaHakim.id, // ID sudah tersimpan langsung
      jumlahSaksi: formValues.jumlahSaksi,
      terdakwa: formValues.namaTerdakwa,
      pasal: maxHukuman, // Nilai maksimal hukuman untuk pasal yang dipilih
      dakwaan: formValues.dakwaan,
    };
    
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(predictionData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setPrediction(result);
      setActiveTab(1); // Pindah ke tab hasil
    } catch (error) {
      console.error('Prediction error:', error);
      setValidationAlert({
        open: true,
        message: 'Terjadi kesalahan saat memproses prediksi. Silakan coba lagi.'
      });
    } finally {
      setIsLoading(false);
    }
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
        {backendData === null ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 400,
            backgroundColor: '#2d3250',
            borderRadius: 2,
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          }}>
            <CircularProgress color="primary" />
            <Box sx={{ ml: 2, color: 'text.secondary' }}>
              Memuat data...
            </Box>
          </Box>
        ) : (
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
                disabled={prediction === null}
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
                  formDisplayNames={formDisplayNames}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  handleAutocompleteChange={handleAutocompleteChange}
                  backendData={backendData}
                  isLoading={isLoading}
                />
              )}
              {activeTab === 1 && prediction && (
                <ResultDisplay 
                  prediction={prediction} 
                  formValues={formValues}
                  formDisplayNames={formDisplayNames}
                  onBack={() => setActiveTab(0)} 
                />
              )}
            </Box>
          </Paper>
        )}
      </Container>
      
      <ValidationAlert 
        open={validationAlert.open}
        message={validationAlert.message}
        onClose={handleCloseAlert}
      />
    </ThemeProvider>
  );
};

export default SentencePredictionForm;