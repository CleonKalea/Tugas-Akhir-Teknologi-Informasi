import React from "react";
import './PredictCardResult.css'

const formatMonths = (months) => {
    if (!months || isNaN(months)) return "N/A";
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
  
    if (years > 0 && remainingMonths > 0) {
      return `${years} Tahun ${remainingMonths} Bulan`;
    } else if (years > 0) {
      return `${years} Tahun`;
    } else {
      return `${remainingMonths} Bulan`;
    }
}

const PredictCardResult = ({ data }) => {
    console.log('Predicted Card Result JSX:', data);

    return (
      <div className="predict-card-result-base">
        <div className="predict-card-result-header"> 
            <h2>Predicted Land Prices</h2>
        </div>
        <div className='predict-card-result-container'>
            <div className="predict-card-result-content">
                <div className='predict-card-result-content-output'>
                    <h3>Lama Kurungan Penjara</h3>
                    <div className="predict-card-result-content-output-box">
                        <h4>{formatMonths(Math.round(data?.bert_prediction))}</h4>
                    </div>
                </div>

                <div className='predict-card-result-content-output'>
                    <h3>Model Used</h3>
                    <div className="predict-card-result-content-output-box">
                        <h4>BERT</h4>
                    </div>
                </div>
            </div>

            <div className="predict-card-result-content">
                <div className='predict-card-result-content-output'>
                    <h3>Lama Kurungan Penjara</h3>
                    <div className="predict-card-result-content-output-box">
                        <h4>{formatMonths(Math.round(data?.lstm_prediction))}</h4>
                    </div>
                </div>

                <div className='predict-card-result-content-output'>
                    <h3>Model Used</h3>
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
