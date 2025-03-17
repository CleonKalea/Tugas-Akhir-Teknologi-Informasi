import React, { useState } from 'react';
import axios from 'axios';
import './PredictCard.css'; 

const PredictCard = ({ onPredictionResult, data }) => {
  const [selectedHakim, setSelectedHakim] = useState('');
  const [selectedPenuntutUmum, setSelectedPenuntutUmum] = useState('');
  const [selectedKlasifikasiPerkara, setSelectedKlasifikasiPerkara] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [barangBukti, setBarangBukti] = useState("");
  const [dakwaan, setDakwaan] = useState("");
  const [jumlahSaksi, setJumlahSaksi] = useState("");

  const handleBarangBuktiChange = (event) => {
    setBarangBukti(event.target.value);
  };

  const handleJumlahSaksiChange = (event) => {
    setJumlahSaksi(event.target.value);
  };

  const handleDakwaanChange = (event) => {
    setDakwaan(event.target.value);
  };

  const handleHakimChange = (event) => {
    setSelectedHakim(event.target.value);
  };

  const handlePenuntutUmumChange = (event) => {
    setSelectedPenuntutUmum(event.target.value);
  };

  const handleKlasifikasiPerkaraChange = (event) => {
    setSelectedKlasifikasiPerkara(event.target.value);
  };

  const handleButtonClick = () => {
    setIsLoading(true);
    
    const formData = {
      hakim: selectedHakim,
      penuntutUmum: selectedPenuntutUmum,
      klasifikasiPerkara: selectedKlasifikasiPerkara,
      jumlahSaksi: jumlahSaksi,
      barangBukti: barangBukti,
      dakwaan: dakwaan

    };
    
    console.log(formData)
    axios.post('http://127.0.0.1:5000/api/predict-one', formData)
      .then(response => {
        onPredictionResult(response.data); // Send prediction result to parent component
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Prediction error:', error);
        setIsLoading(false);
      });
  };

  return (
    <div>

      <div className="predict-card-header">
          <h2>Predict Jail Time</h2>
      </div>
        
      <div className="predict-card-base">
    
        <div className="predict-card-content">
          {/* Klasifikasi Perkara Dropdown */}
          <div className='predict-card-content-input'>
            <h3>Klasifikasi Perkara</h3>
            <div className="predict-card-content-input-dropdown">
              <select value={selectedKlasifikasiPerkara} onChange={handleKlasifikasiPerkaraChange}>
                <option value="" disabled>Select an option</option>
                {data?.klasifikasi_perkara_mapping &&
                  Object.entries(data.klasifikasi_perkara_mapping).map(([name, id]) => (
                    <option key={id} value={id}>{name}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
        
        <div className="predict-card-content">
          {/* Penuntut Umum Dropdown */}
          <div className='predict-card-content-input'>
            <h3>Penuntut Umum</h3>
            <div className="predict-card-content-input-dropdown">
              <select value={selectedPenuntutUmum} onChange={handlePenuntutUmumChange}>
                <option value="" disabled>Select an option</option>
                {data?.penuntut_umum_mapping &&
                  Object.entries(data.penuntut_umum_mapping).map(([name, id]) => (
                    <option key={id} value={id}>{name}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>

        <div className="predict-card-content">
          {/* Hakim Dropdown */}
          <div className='predict-card-content-input'>
            <h3>Hakim</h3>
            <div className="predict-card-content-input-dropdown">
              <select value={selectedHakim} onChange={handleHakimChange}>
                <option value="" disabled>Select an option</option>
                {data?.hakim_mapping &&
                  Object.entries(data.hakim_mapping).map(([name, id]) => (
                    <option key={id} value={id}>{name}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>

        <div className="predict-card-content">
          {/* Jumlah Saksi Input */}
          <div className="predict-card-content-input">
            <h3>Jumlah Saksi</h3>
            <div className="predict-card-content-input-dropdown">
              <input 
                type="number" 
                value={jumlahSaksi} 
                onChange={handleJumlahSaksiChange} 
                min="0" 
                className="predict-card-content-input-saksi"
              />
            </div>
          </div>
        </div>

      </div>
    
      <div className="predict-card-header">
          <h2>Barang Bukti</h2>
      </div>

      <div className="predict-card-base">
          <textarea
            type="textarea"
            value={barangBukti}
            onChange={handleBarangBuktiChange}
            placeholder="Type something..."
            className="predict-textbox"
          />
        </div>

      <div className="predict-card-header">
          <h2>Dakwaan</h2>
      </div>
      <div className="predict-card-base">
          <textarea
            type="textarea"
            value={dakwaan}
            onChange={handleDakwaanChange}
            placeholder="Type something..."
            className="predict-textbox"
          />
        </div>

      <button onClick={handleButtonClick} className="predict-button" disabled={isLoading}>
        {isLoading ? 'Predicting...' : 'Predict'}
      </button>
    </div>
  );
};

export default PredictCard;
