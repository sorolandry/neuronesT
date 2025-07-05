import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Note le 'Routes' au lieu de 'Switch'
// import Home from './components/Home'; // Importe ton composant Home
// import About from './components/About'; // Exemple d'un autre composant

import './App.css';

function App() {
  return (
    <>
      {/* 1. Le Router enveloppe toute l'application */}
      <Router>
        <Navbar />
        <Routes>

        </Routes>
      </Router>
    </>
  );
}

export default App;