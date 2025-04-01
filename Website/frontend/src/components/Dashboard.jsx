import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import AnalyticCard from './AnalyticCard';
import SummaryTab from './SummaryTab';
import CustomCarousel from './Carousel';


const Dashboard = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
    };

    fetchData();
  }, []);


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
      value: "92% ", 
      image: "https://img.icons8.com/ios-filled/50/FFFFFF/country.png" 
    },

    { 
      title: 'Last Updated', 
      value: datas.length > 0 ? `${datas.length} Lands` : 'Loading...', 
      image: "https://img.icons8.com/ios-glyphs/30/FFFFFf/handshake--v1.png" 
    },
  ];

  return (
    <div className="base">
      <div>
        <h2>Overview</h2>
      </div>

    </div>
  );
};

export default Dashboard;
