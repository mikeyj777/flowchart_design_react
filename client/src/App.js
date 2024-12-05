import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PressureVesselFlowchart from './components/PressureVesselFlowchart';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flowchart" element={<PressureVesselFlowchart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;