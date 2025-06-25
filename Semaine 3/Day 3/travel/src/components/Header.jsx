// src/components/Header.jsx

/*
  Composant Header pour la page d'atterrissage StreamLine.
  Affiche le logo de l'entreprise, les liens de navigation et les boutons d'action.
  Gère également l'ouverture/fermeture du menu burger pour les appareils mobiles.
*/

import React, { useState } from 'react'; // Importe React et le hook useState pour gérer l'état
import { FiMenu, FiX } from 'react-icons/fi'; // Importe les icônes de menu (burger) et de fermeture
import '../index.css'

function Header() {
  // `useState` permet d'ajouter un état local à un composant fonctionnel.
  // `isMenuOpen` stocke un booléen (true/false) indiquant si le menu mobile est ouvert.
  // `setIsMenuOpen` est la fonction pour modifier cet état.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour basculer l'état du menu (ouvrir/fermer)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Inverse la valeur de isMenuOpen
  };

  return (
    <header className="header"> {/* Balise sémantique <header> avec une classe CSS */}
      <div className="container header__container"> {/* Conteneur pour centrer et limiter la largeur */}
 
        {/* Logo de l'entreprise */}
        <div className="header__logo">
          <a href="/" aria-label="Accueil StreamLine">
            StreamLine
          </a>
        </div>

        {/* Bouton du menu burger (visible uniquement sur mobile/tablette) */}
        <button className="header__menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
          {/* Affiche l'icône de fermeture si le menu est ouvert, sinon l'icône de menu burger */}
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Navigation principale */}
        {/* Ajoute la classe 'header__nav--open' si le menu est ouvert pour les styles mobiles */}
        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <a href="#features" className="header__nav-link" onClick={() => setIsMenuOpen(false)}>Fonctionnalités</a>
            </li>
            <li className="header__nav-item">
              <a href="#testimonials" className="header__nav-link" onClick={() => setIsMenuOpen(false)}>Témoignages</a>
            </li>
            <li className="header__nav-item">
              <a href="#pricing" className="header__nav-link" onClick={() => setIsMenuOpen(false)}>Tarifs</a>
            </li>
            <li className="header__nav-item">
              <a href="#contact" className="header__nav-link" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </li>
          </ul>

          {/* Boutons d'action (CTA) dans la navigation */}
          <div className="header__actions">
            <a href="#" className="btn btn-outline header__btn-login">Connexion</a>
            <a href="#" className="btn btn-primary header__btn-trial">Essai Gratuit</a>
          </div>
        </nav>

      </div>
    </header>
  );
}

export default Header; // Exporte le composant pour qu'il puisse être importé ailleurs