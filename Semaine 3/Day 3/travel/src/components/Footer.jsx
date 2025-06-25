// src/components/Footer.jsx

/*
  Composant Footer pour la page d'atterrissage StreamLine.
  Contient les informations de copyright, des liens de navigation secondaires,
  et les icônes de médias sociaux.
*/

import React from 'react'; // Importe React
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi'; // Importe les icônes de médias sociaux

function Footer() {
  const currentYear = new Date().getFullYear(); // Obtient l'année actuelle pour le copyright

  return (
    <footer className="footer"> {/* Balise sémantique <footer> */}
      <div className="container footer__container">
        {/* Colonne 1: Informations de l'entreprise */}
        <div className="footer__column footer__column--info">
          <div className="footer__logo">StreamLine</div>
          <p className="footer__description">
            Automatisez vos tâches et gérez vos projets simplement.
          </p>
          <p className="footer__copyright">
            &copy; {currentYear} StreamLine. Tous droits réservés.
          </p>
        </div>

        {/* Colonne 2: Liens rapides */}
        <div className="footer__column">
          <h4 className="footer__heading">Liens Rapides</h4>
          <ul className="footer__list">
            <li className="footer__list-item"><a href="#hero" className="footer__link">Accueil</a></li>
            <li className="footer__list-item"><a href="#features" className="footer__link">Fonctionnalités</a></li>
            <li className="footer__list-item"><a href="#pricing" className="footer__link">Tarifs</a></li>
            <li className="footer__list-item"><a href="#testimonials" className="footer__link">Témoignages</a></li>
          </ul>
        </div>

        {/* Colonne 3: Support */}
        <div className="footer__column">
          <h4 className="footer__heading">Support</h4>
          <ul className="footer__list">
            <li className="footer__list-item"><a href="#" className="footer__link">FAQ</a></li>
            <li className="footer__list-item"><a href="#" className="footer__link">Centre d'aide</a></li>
            <li className="footer__list-item"><a href="#" className="footer__link">Contactez-nous</a></li>
            <li className="footer__list-item"><a href="#" className="footer__link">Confidentialité</a></li>
          </ul>
        </div>

        {/* Colonne 4: Médias sociaux */}
        <div className="footer__column footer__column--social">
          <h4 className="footer__heading">Suivez-nous</h4>
          <div className="footer__social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FiFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FiTwitter size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FiInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; // Exporte le composant Footer