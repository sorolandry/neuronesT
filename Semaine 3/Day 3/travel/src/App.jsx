// src/App.jsx

import React from 'react';
import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />

      <main>
        {/*
          Enveloppe tous les composants de section du main
          dans un Fragment React (<></>) pour qu'ils aient un parent unique.
          C'est la cause de l'erreur "Adjacent JSX elements...".
        */}
        <>
          <Hero />
          <Features />
          <Testimonials />
          <Pricing />
          <FinalCTA />
        </>
      </main>

      <Footer />
    </>
  );
}

export default App;