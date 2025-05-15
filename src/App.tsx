import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//for bigger apps, I add a separate routes page
const CountryDetail = React.lazy(()=> import('./pages/CountryDetail'))
const Home = React.lazy(()=> import('./pages/Home'))
//lazy loading and suspense to help with speed with a large data set and provide a fallback ui while waiting
const App = () => {
    return (
      <Router>
        <Suspense fallback={<p>Loading page...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:code" element={<CountryDetail />} />
          </Routes>
        </Suspense>
      </Router>
    );
}

export default App;
