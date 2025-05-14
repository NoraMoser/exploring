import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
//I realize the using react query is overkill for this size app, but it's used so much in bigger apps that I figured I would just go for it

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
