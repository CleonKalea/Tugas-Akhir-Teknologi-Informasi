import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

const ResultDisplay = ({ prediction, formValues, formDisplayNames, onBack }) => {
  // Fungsi untuk mengkonversi prediction ke format yang sesuai
  const formatPrediction = (value) => {
    // Jika prediction berupa object dengan property prediction
    if (typeof value === 'object' && value !== null && 'prediction' in value) {
      value = value.prediction;
    }
    
    // Konversi ke number untuk memastikan
    const numValue = Number(value);
    
    // Jika masih bukan number yang valid, tampilkan pesan error
    if (isNaN(numValue)) {
      console.error("Prediction bukan angka valid:", value);
      return "Data tidak valid";
    }
    
    // Perhitungan tahun dan bulan
    const tahun = Math.floor(numValue / 12);
    const bulan = Math.floor(numValue - (tahun * 12));
    const hari = Math.round((numValue - Math.floor(numValue)) * 30);
    
    // Membuat array komponen waktu
    const components = [];
    
    // Hanya tambahkan komponen jika nilainya lebih dari 0
    if (tahun > 0) {
      components.push(`${tahun} Tahun`);
    }
    
    if (bulan > 0) {
      components.push(`${bulan} Bulan`);
    }
    
    if (hari > 0) {
      components.push(`${hari} Hari`);
    }
    
    // Jika tidak ada komponen waktu (semua 0), kembalikan 0 Hari
    if (components.length === 0) {
      return "0 Hari";
    }
    
    // Gabungkan komponen waktu dengan spasi
    return components.join(" ");
  };

  return (
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
          Estimasi Lama Hukuman Penjara
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#f9b17a' }}>
          {formatPrediction(prediction)}
        </Typography>
      </Box>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
          Prediksi ini menyangkut Terdakwa {formDisplayNames.namaTerdakwa} dalam 
          tindak pidana perkara {formDisplayNames.klasifikasiPerkara}. Tuntutan diajukan oleh 
          Penuntut Umum {formDisplayNames.namaPenuntutUmum}, dengan 
          dasar {formDisplayNames.pasal} dan menghadirkan {formDisplayNames.jumlahSaksi} orang saksi, 
          serta diperiksa dan diadili oleh {formDisplayNames.namaHakim} selaku Ketua Majelis Hakim.
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          Hasil prediksi ini diperoleh menggunakan model Bidirectional-LSTM yang telah dilatih dengan data perkara asli sebelumnya. 
          Model mencapai Mean Absolute Error (MAE) sebesar 5,49 bulan, yang berarti rata-rata selisih antara hasil 
          prediksi dan putusan aktual berada di kisaran ±5,5 bulan. Perlu diingat bahwa putusan akhir tetap dapat 
          berbeda, karena dipengaruhi oleh pertimbangan Majelis Hakim serta berbagai faktor yuridis dan non-yuridis yang relevan.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={onBack}
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
  );
};

ResultDisplay.propTypes = {
  prediction: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string
  ]).isRequired,
  onBack: PropTypes.func.isRequired
};

export default ResultDisplay;