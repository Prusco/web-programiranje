import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';  // Uvozimo AuthContextProvider
import App from './App';  // Tvoja glavna aplikacija

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider> {/* Ovdje omotavamo cijelu aplikaciju s AuthContextProvider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
