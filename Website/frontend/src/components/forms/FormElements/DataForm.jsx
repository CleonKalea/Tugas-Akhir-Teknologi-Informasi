import React from 'react';
import { Box, TextField, Button, Autocomplete } from '@mui/material';
import PropTypes from 'prop-types';
import { 
  KLASIFIKASI_PERKARA, 
  NAMA_HAKIM, 
  NAMA_PENUNTUT_UMUM, 
  NAMA_TERDAKWA,
  PASAL 
} from '../../../constants/formData';
import FormHeader from './FormHeader';

const DataForm = ({ formValues, handleChange, handleSubmit, handleAutocompleteChange }) => {
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
              options={KLASIFIKASI_PERKARA}
              value={formValues.klasifikasiPerkara || null}
              onChange={(event, newValue) => handleAutocompleteChange('klasifikasiPerkara', newValue)}
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
              onChange={(event, newValue) => handleAutocompleteChange('namaPenuntutUmum', newValue)}
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
              options={NAMA_TERDAKWA}
              value={formValues.namaTerdakwa || null}
              onChange={(event, newValue) => handleAutocompleteChange('namaTerdakwa', newValue)}
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
              onChange={(event, newValue) => handleAutocompleteChange('namaHakim', newValue)}
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
              onChange={(event, newValue) => handleAutocompleteChange('pasal', newValue)}
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
  );
};

DataForm.propTypes = {
  formValues: PropTypes.shape({
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
  handleAutocompleteChange: PropTypes.func.isRequired
};

export default DataForm;