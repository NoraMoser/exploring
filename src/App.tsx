import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//link for router docs is in the readme
import ErrorBoundary from "./components/ErrorBoundary";
//for bigger apps, I add a separate routes page
const CountryDetail = React.lazy(() => import("./pages/CountryDetail"));
const Home = React.lazy(() => import("./pages/Home"));
//lazy loading and suspense to help with speed with a large data set and provide a fallback ui while waiting

const App = () => {
  return (
    <ErrorBoundary>
      {/* wraps all components in error boundary so app is not broken with an error */}
      <Router basename="/exploring">
        {/* move from one page to the other */}
        <Suspense fallback={<p>Loading page...</p>}>
          {/* for while we're waiting on the lazy loading */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:code" element={<CountryDetail />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
