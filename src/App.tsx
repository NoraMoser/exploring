import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//for bigger apps, I add a separate routes page
const CountryDetail = React.lazy(()=> import('./pages/CountryDetail'))
const Home = React.lazy(()=> import('./pages/Home'))
//lazy loading is kind of overkill for this size app, but still a good habit
const App = () => {
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
