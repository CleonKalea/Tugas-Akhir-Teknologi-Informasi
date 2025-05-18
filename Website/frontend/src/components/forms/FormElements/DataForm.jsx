import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Autocomplete, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import FormHeader from './FormHeader';

const DataForm = ({ 
  formValues, 
  formDisplayNames,
  handleChange, 
  handleSubmit, 
  handleAutocompleteChange, 
  backendData, 
  isLoading 
}) => {
  // Local state to handle problematic values
  const [localFormValues, setLocalFormValues] = useState(formValues);
  
  // Update local state when formValues changes from parent
  useEffect(() => {
    setLocalFormValues(formValues);
  }, [formValues]);
 
  // Ekstrak data dari backend
  const klasifikasiOptions = backendData ? 
    Object.entries(backendData.klasifikasi_perkara_mapping).map(([name, id]) => ({ 
      name, 
      id: Number(id)
    })) : [];
  const hakimOptions = backendData ? 
    Object.entries(backendData.hakim_mapping).map(([name, id]) => ({ 
      name, 
      id: Number(id)
    })) : [];
  const penuntutOptions = backendData ? 
    Object.entries(backendData.penuntut_umum_mapping).map(([name, id]) => ({ 
      name, 
      id: Number(id)
    })) : [];
  
  // Custom handler for autocomplete changes
  const handleAutocompleteChangeLocal = (fieldName, value, displayName) => {
    // console.log(`Local handler - ${fieldName}:`, value, displayName);
    
    // Update local state immediately
    setLocalFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Also update display names if provided
    if (displayName !== undefined) {
      setLocalFormValues(prev => ({
        ...prev,
        [`${fieldName}DisplayName`]: displayName
      }));
    }
    
    // Call the parent handler
    try {
      handleAutocompleteChange(fieldName, value, displayName);
    } catch (error) {
      console.error('Error calling parent handleAutocompleteChange:', error);
    }
  };
  
  // Untuk pasal, kita perlu objek dengan nama pasal dan nilai maksimal hukuman
  const pasalOptions = backendData ? 
    Object.entries(backendData.pasal_mapping).map(([name, maxHukuman]) => ({ 
      name, 
      maxHukuman 
    })) : [];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 4,
        p: 4
      }}
    >
      <Box sx={{ mb: 1, position: 'relative', pt: 3 }}>
        <FormHeader />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: 2,
              mt: 2,
            }}
          >
            {/* Klasifikasi Perkara */}
            <Autocomplete
              fullWidth
              options={klasifikasiOptions}
              getOptionLabel={(option) => option?.name || ''}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id
              }}
              value={localFormValues.klasifikasiPerkara}
              onChange={(event, newValue) => {
                // console.log('Klasifikasi onChange - newValue:', newValue);
                if (newValue) {
                  handleAutocompleteChangeLocal('klasifikasiPerkara', newValue, newValue?.name);
                } else {
                  handleAutocompleteChangeLocal('klasifikasiPerkara', '', '');
                }
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
              disabled={isLoading}
            />
            
            {/* Penuntut Umum */}
            <Autocomplete
              fullWidth
              options={penuntutOptions}
              getOptionLabel={(option) => option?.name || ''}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id
              }}
              value={localFormValues.namaPenuntutUmum} 
              onChange={(event, newValue) => {
                // console.log('Penuntut onChange - newValue:', newValue);
                if (newValue) {
                  handleAutocompleteChangeLocal('namaPenuntutUmum', newValue, newValue?.name);
                } else {
                  handleAutocompleteChangeLocal('namaPenuntutUmum', '', '');
                }
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
              disabled={isLoading}
            />
            
            {/* Nama Terdakwa */}
            <TextField
              fullWidth
              label="Nama Terdakwa"
              name="namaTerdakwa"
              value={localFormValues.namaTerdakwa || ''}
              onChange={(e) => {
                setLocalFormValues(prev => ({
                  ...prev,
                  namaTerdakwa: e.target.value
                }));
                handleChange(e);
              }}
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
              disabled={isLoading}
            />
            
            {/* Hakim */}
            <Autocomplete
              fullWidth
              options={hakimOptions}
              getOptionLabel={(option) => option?.name || ''}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id
              }}
              value={localFormValues.namaHakim} 
              onChange={(event, newValue) => {
                // console.log('Hakim onChange - newValue:', newValue);
                if (newValue) {
                  handleAutocompleteChangeLocal('namaHakim', newValue, newValue?.name);
                } else {
                  handleAutocompleteChangeLocal('namaHakim', '', '');
                }
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
              disabled={isLoading}
            />
          </Box>
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 5fr', 
              gap: 2
            }}
          >
            {/* Jumlah Saksi - Narrower */}
            <TextField
              fullWidth
              label="Jumlah Saksi"
              name="jumlahSaksi"
              type="number"
              value={localFormValues.jumlahSaksi || ''}
              onChange={(e) => {
                // Pastikan nilai tidak negatif
                const value = Math.max(0, parseInt(e.target.value) || 0);
                const event = {
                  target: {
                    name: 'jumlahSaksi',
                    value: value.toString()
                  }
                };
                
                // Update local state
                setLocalFormValues(prev => ({
                  ...prev,
                  jumlahSaksi: value.toString()
                }));
                
                // Update form dengan nilai yang sudah divalidasi
                handleChange(event);
              }}
              inputProps={{ 
                min: 0,  // Input HTML min attribute
                step: 1  // Hanya izinkan bilangan bulat
              }}
              InputProps={{
                style: {
                  height: 56
                }
              }}
              sx={{ 
                '& .MuiInputBase-root': {
                  backgroundColor: 'background.dropdown'
                },
                // Menyembunyikan tombol up/down spinner dengan camelCase yang benar
                '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0
                },
                '& input[type=number]': {
                  MozAppearance: 'textfield' // Firefox
                }
              }}
              disabled={isLoading}
            />
            
            {/* Pasal - Wider */}
            <Autocomplete
              fullWidth
              options={pasalOptions}
              getOptionLabel={(option) => option?.name || ''}
              isOptionEqualToValue={(option, value) => {
                if (!option || !value) return false;
                return option.name === value.name;
              }}
              value={localFormValues.pasal ? 
                pasalOptions.find(option => option.name === localFormValues.pasal) || null : null}
              onChange={(event, newValue) => {
                // Menyimpan nama pasal sebagai nilainya
                const pasalName = newValue ? newValue.name : '';
                
                // Update local state
                setLocalFormValues(prev => ({
                  ...prev,
                  pasal: pasalName
                }));
                
                handleAutocompleteChange('pasal', pasalName, pasalName);
                
                // Meneruskan nilai maksimal hukuman ke parent component
                if (newValue && newValue.maxHukuman !== null && newValue.maxHukuman !== undefined) {
                  // Ini akan mengatur maxHukuman di PredictSentenceForm.jsx
                  handleAutocompleteChange('maxHukuman', newValue.maxHukuman);
                }
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
              disabled={isLoading}
            />
          </Box>
          <TextField
            fullWidth
            label="Dakwaan"
            name="dakwaan"
            multiline
            rows={10}
            value={localFormValues.dakwaan || ''}
            onChange={(e) => {
              setLocalFormValues(prev => ({
                ...prev,
                dakwaan: e.target.value
              }));
              handleChange(e);
            }}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                padding: '14px 14px',
                backgroundColor: 'background.dropdown'
              }
            }}
            disabled={isLoading}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSubmit}
              sx={{ 
                minWidth: 150,
                position: 'relative'
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <CircularProgress 
                    size={24} 
                    sx={{ 
                      color: 'white',
                      position: 'absolute', 
                      left: 'calc(50% - 12px)' 
                    }} 
                  />
                  <span style={{ visibility: 'hidden' }}>PREDIKSI</span>
                </>
              ) : (
                'PREDIKSI'
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

DataForm.propTypes = {
  formValues: PropTypes.shape({
    klasifikasiPerkara: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      })
    ]),

    namaHakim: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      })
    ]),

    namaPenuntutUmum: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      })
    ]),
    
    namaTerdakwa: PropTypes.string,
    jumlahSaksi: PropTypes.string,
    pasal: PropTypes.string,
    dakwaan: PropTypes.string
  }).isRequired,
  formDisplayNames: PropTypes.shape({
    klasifikasiPerkara: PropTypes.string,
    namaHakim: PropTypes.string,
    namaPenuntutUmum: PropTypes.string,
    namaTerdakwa: PropTypes.string,
    jumlahSaksi: PropTypes.string,
    pasal: PropTypes.string,
    dakwaan: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleAutocompleteChange: PropTypes.func.isRequired,
  backendData: PropTypes.object,
  isLoading: PropTypes.bool
};

export default DataForm;