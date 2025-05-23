import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Router from './router/Router'; // Importuj Router komponentu

function App() {
  return (
    <div>
      <Header />
      <div style={{ minHeight: '80vh' }}>
        <Router /> {/* Umesto Routes, koristi Router */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
