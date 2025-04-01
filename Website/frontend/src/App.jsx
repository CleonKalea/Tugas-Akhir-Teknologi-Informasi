import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PricePrediction from './components/PricePrediction'; 
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('prediction');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <div className="dashboard">
        <Sidebar onPageChange={handlePageChange} />
        {currentPage === 'prediction' && <PricePrediction />}
        {currentPage === 'modelExplanation' && <Dashboard />}
      </div>
    </div>
  );
}

export default App;
