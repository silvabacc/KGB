import './App.css';
import React from 'react';
import Home from './home/Home';
import HealthCheck from './healthcheck/healthcheck';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/healthcheck" element={<HealthCheck />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
