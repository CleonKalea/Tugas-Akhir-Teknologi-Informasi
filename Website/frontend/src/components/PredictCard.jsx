import React, { useState } from 'react';
import './PredictCard.css';

const PredictCard = ({ onPredictionResult, data }) => {
  const [selectedHakim, setSelectedHakim] = useState('');
  const [selectedPenuntutUmum, setSelectedPenuntutUmum] = useState('');
  const [selectedKlasifikasiPerkara, setSelectedKlasifikasiPerkara] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [barangBukti, setBarangBukti] = useState('');
  const [dakwaan, setDakwaan] = useState('');
  const [jumlahSaksi, setJumlahSaksi] = useState('');

  const handleButtonClick = async () => {
    setIsLoading(true);

    const formData = {
      hakim: selectedHakim,
      penuntutUmum: selectedPenuntutUmum,
      klasifikasiPerkara: selectedKlasifikasiPerkara,
      jumlahSaksi: jumlahSaksi,
      barangBukti: barangBukti,
      dakwaan: dakwaan,
    };

    console.log(formData);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Ensure the server accepts JSON
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      onPredictionResult(data);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="predict-card-header">
        <h2>Predict Jail Time</h2>
      </div>

      <div className="predict-card-base">
        {/* Klasifikasi Perkara Dropdown */}
        <div className="predict-card-content">
          <div className='predict-card-content-input'>
            <h3>Klasifikasi Perkara</h3>
            <div className="predict-card-content-input-dropdown">
              <select value={selectedKlasifikasiPerkara} onChange={(e) => setSelectedKlasifikasiPerkara(e.target.value)}>
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

        {/* Penuntut Umum Dropdown */}
        <div className="predict-card-content">
          <div className='predict-card-content-input'>
            <h3>Penuntut Umum</h3>
            <div className="predict-card-content-input-dropdown">
              <select value={selectedPenuntutUmum} onChange={(e) => setSelectedPenuntutUmum(e.target.value)}>
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

        {/* Hakim Dropdown */}
        <div className="predict-card-content">
          <div className='predict-card-content-input'>
            <h3>Hakim</h3>
            <div className="predict-card-content-input-dropdown">
              <select value={selectedHakim} onChange={(e) => setSelectedHakim(e.target.value)}>
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

        {/* Jumlah Saksi Input */}
        <div className="predict-card-content">
          <div className="predict-card-content-input">
            <h3>Jumlah Saksi</h3>
            <div className="predict-card-content-input-dropdown">
              <input
                type="number"
                value={jumlahSaksi}
                onChange={(e) => setJumlahSaksi(e.target.value)}
                min="0"
                className="predict-card-content-input-saksi"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Barang Bukti */}
      <div className="predict-card-header">
        <h2>Barang Bukti</h2>
      </div>
      <div className="predict-textbox-container">
        <textarea
          value={barangBukti}
          onChange={(e) => setBarangBukti(e.target.value)}
          placeholder="Type something..."
          className="predict-textbox"
        />
      </div>

      {/* Dakwaan */}
      <div className="predict-card-header">
        <h2>Dakwaan</h2>
      </div>
      <div className="predict-textbox-container"  >
        <textarea
          value={dakwaan}
          onChange={(e) => setDakwaan(e.target.value)}
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
