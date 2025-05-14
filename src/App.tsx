import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//for bigger apps, I add a separate routes page
import Home from './pages/Home'
import CountryDetail from './pages/CountryDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<CountryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
