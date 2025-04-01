import React, { useState, useEffect } from 'react';
import PredictCard from './PredictCard';
import AnalyticCard from './AnalyticCard';
import './PricePrediction.css';
import PredictCardResult from './PredictCardResult';
import BarChart from './BarChart'


const PricePrediction = () => {

  const [datas, setDatas] = useState([]);
  const [predictedPrices, setPredictedPrices] = useState({});


  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = async () => {
    const response = await fetch('http://127.0.0.1:5000/data');
    const data = await response.json();
    setDatas(data);
    // console.log(data)
  };
  
  const analyticData = [
    { title: 'Train Data', 
      value: "4000 Data",
      image: "https://img.icons8.com/ios-filled/100/FFFFFf/money-bag.png" 
    },

    { title: 'Test Data', 
      value: "1200 Data", 
      image: "https://img.icons8.com/ios-filled/50/FFFFFf/nui2.png" 
    },

    { title: 'Model Accuracy', 
      value: "-% ", 
      image: "https://img.icons8.com/ios-filled/50/FFFFFF/country.png" 
    },

    { 
      title: 'Last Updated', 
      value: datas.length > 0 ? `${formatTotalLand(datas.length)} Lands` : 'Loading...', 
      image: "https://img.icons8.com/ios-glyphs/30/FFFFFf/handshake--v1.png" 
    },
  ];
  
  const handlePredictionResult = (predictions) => {
    setPredictedPrices(predictions);
    console.log(predictions)
  };

  return (
    <div className="base">
      <h2>Price Prediction</h2>

      <div className='AnalyticCard'>
        {analyticData.map((data, index) => (
          <AnalyticCard key={index} title={data.title} value={data.value} image={data.image} />
        ))}
      </div>

      <div className='main-content'>
          <PredictCard onPredictionResult={handlePredictionResult} data={datas}/>
          {Object.keys(predictedPrices).length > 0 && <PredictCardResult data={predictedPrices} />}
      </div>

    </div>
  );
};

export default PricePrediction;
