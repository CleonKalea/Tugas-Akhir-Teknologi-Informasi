import React from "react";
import './PredictCardResult.css'

const formatMonths = (months) => {
    if (!months || isNaN(months)) return "N/A";

    // Konversi bulan desimal menjadi total hari
    // const totalHari = months * 30
    const tahun = Math.floor(months / 12)
    const bulan = Math.floor(months - tahun * 12)

    const hari = Math.round((months - Math.floor(months)) * 30)
    let result = [];

    if (tahun > 0) result.push(`${tahun} Tahun`);
    if (bulan > 0) result.push(`${bulan} Bulan`);
    if (hari > 0) result.push(`${hari} Hari`);

    return result.length > 0 ? result.join(" ") : "0 Hari";
};

const PredictCardResult = ({ data }) => {
    console.log('Predicted Card Result JSX:', data);

    return (
      <div className="predict-card-result-base">
        <div className="predict-card-result-header"> 
            <h2>Hasil Prediksi</h2>
        </div>
        <div className='predict-card-result-container'>
            <div className="predict-card-result-content">
                <div className='predict-card-result-content-output'>
                    <h3>Lama Kurungan Penjara</h3>
                    <div className="predict-card-result-content-output-box">
                        <h4>{formatMonths(data?.bert_prediction)}</h4>
                    </div>
                </div>

                <div className='predict-card-result-content-output'>
                    <h3>Model</h3>
                    <div className="predict-card-result-content-output-box">
                        <h4>BERT</h4>
                    </div>
                </div>
            </div>

            <div className="predict-card-result-content">
                <div className='predict-card-result-content-output'>
                    <h3>Lama Kurungan Penjara</h3>
                    <div className="predict-card-result-content-output-box">
                        <h4>{formatMonths(data?.lstm_prediction)}</h4>
                    </div>
                </div>

                <div className='predict-card-result-content-output'>
                    <h3>Model</h3>
                    <div className="predict-card-result-content-output-box">
                        <h4>LSTM</h4>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
};

export default PredictCardResult;
