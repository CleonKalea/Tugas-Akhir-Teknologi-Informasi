import React from 'react';
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
 
  // Ekstrak data dari backend
  const klasifikasiOptions = backendData ? 
    Object.entries(backendData.klasifikasi_perkara_mapping).map(([name, id]) => ({ 
      name, 
      id 
    })) : [];
  const hakimOptions = backendData ? 
    Object.entries(backendData.hakim_mapping).map(([name, id]) => ({ 
      name, 
      id 
    })) : [];
  const penuntutOptions = backendData ? 
    Object.entries(backendData.penuntut_umum_mapping).map(([name, id]) => ({ 
      name, 
      id 
    })) : [];

    console.log('Current formValues.klasifikasiPerkara:', formValues.klasifikasiPerkara);
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
              getOptionLabel={(option) => {
                // Handle berbagai format input
                if (typeof option === 'string') return option;
                if (option && option.name) return option.name;
                return '';
              }}
              isOptionEqualToValue={(option, value) => {
                if (value === null) return false;
                if (typeof value === 'string') return option.name === value || option.id === value;
                return option.id === value.id || option.id === value;
              }}
              value={formValues.klasifikasiPerkara ? 
                klasifikasiOptions.find(option => 
                  option.id === formValues.klasifikasiPerkara || 
                  option.name === formValues.klasifikasiPerkara
                ) || null : null}
              onChange={(event, newValue) => {
                const valueToStore = newValue ? 
                  (typeof newValue === 'object' ? newValue.id : newValue) : 
                  '';
                const displayName = newValue ? 
                  (typeof newValue === 'object' ? newValue.name : newValue) : 
                  '';
                handleAutocompleteChange('klasifikasiPerkara', valueToStore, displayName);
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
              getOptionLabel={(option) => {
                if (typeof option === 'string') return option;
                if (option && option.name) return option.name;
                return '';
              }}
              isOptionEqualToValue={(option, value) => {
                if (value === null) return false;
                if (typeof value === 'string') return option.name === value || option.id === value;
                return option.id === value.id || option.id === value;
              }}
              value={formValues.namaPenuntutUmum ? 
                penuntutOptions.find(option => 
                  option.id === formValues.namaPenuntutUmum || 
                  option.name === formValues.namaPenuntutUmum
                ) || null : null}
              onChange={(event, newValue) => {
                const valueToStore = newValue ? 
                  (typeof newValue === 'object' ? newValue.id : newValue) : 
                  '';
                const displayName = newValue ? 
                  (typeof newValue === 'object' ? newValue.name : newValue) : 
                  '';
                handleAutocompleteChange('namaPenuntutUmum', valueToStore, displayName);
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
              value={formValues.namaTerdakwa}
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
              disabled={isLoading}
            />
            {/* Hakim */}
            <Autocomplete
              fullWidth
              options={hakimOptions}
              getOptionLabel={(option) => {
                if (typeof option === 'string') return option;
                if (option && option.name) return option.name;
                return '';
              }}
              isOptionEqualToValue={(option, value) => {
                if (value === null) return false;
                if (typeof value === 'string') return option.name === value || option.id === value;
                return option.id === value.id || option.id === value;
              }}
              value={formValues.namaHakim ? 
                hakimOptions.find(option => 
                  option.id === formValues.namaHakim || 
                  option.name === formValues.namaHakim
                ) || null : null}
              onChange={(event, newValue) => {
                const valueToStore = newValue ? 
                  (typeof newValue === 'object' ? newValue.id : newValue) : 
                  '';
                const displayName = newValue ? 
                  (typeof newValue === 'object' ? newValue.name : newValue) : 
                  '';
                handleAutocompleteChange('namaHakim', valueToStore, displayName);
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
              value={formValues.jumlahSaksi}
              onChange={(e) => {
                // Pastikan nilai tidak negatif
                const value = Math.max(0, parseInt(e.target.value) || 0);
                // Update form dengan nilai yang sudah divalidasi
                handleChange({
                  target: {
                    name: 'jumlahSaksi',
                    value: value.toString()
                  }
                });
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
              getOptionLabel={(option) => {
                if (typeof option === 'string') return option;
                if (option && option.name) return option.name;
                return '';
              }}
              isOptionEqualToValue={(option, value) => {
                if (value === null) return false;
                if (typeof value === 'string') return option.name === value;
                return option.name === value.name;
              }}
              value={formValues.pasal ? 
                pasalOptions.find(option => option.name === formValues.pasal) || null : null}
              onChange={(event, newValue) => {
                // Menyimpan nama pasal sebagai nilainya
                const pasalName = newValue ? newValue.name : '';
                handleAutocompleteChange('pasal', pasalName, pasalName);
                
                // Meneruskan nilai maksimal hukuman ke parent component
                if (newValue && newValue.maxHukuman) {
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
            value={formValues.dakwaan}
            onChange={handleChange}
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
      PropTypes.string,
      PropTypes.number
    ]),
    namaHakim: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    namaPenuntutUmum: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
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