import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LiquorDetail from './pages/LiquorDetail';
import Gallery from './pages/Gallery';
import Compare from './pages/Compare';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/liquor/:id" element={<LiquorDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
