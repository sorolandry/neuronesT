// src/components/Hero.jsx

/*
  Composant Hero pour la page d'atterrissage StreamLine.
  Affiche le titre principal accrocheur, une brève description du service,
  et le bouton d'appel à l'action (CTA) principal.
*/

import React from 'react'; // Importe React

function Hero() {
  return (
    <section id="hero" className="hero section-padding"> {/* Utilise notre classe utilitaire pour le padding */}
      <div className="container text-center"> {/* Centrage du contenu et largeur max */}
        {/* Titre principal H1 */}
        <h1 className="hero__title">
          Automatisez vos tâches et gérez vos projets simplement
        </h1>

        {/* Description de la proposition de valeur */}
        <p className="hero__description">
          StreamLine est la plateforme SaaS innovante qui transforme la façon dont votre équipe collabore.
          Dites adieu au chaos et bonjour à une productivité sans précédent.
        </p>

        {/* Bouton d'appel à l'action principal */}
        <a href="#signup" className="btn btn-secondary hero__cta-btn">
          Démarrer l'Essai Gratuit
        </a>
      </div>
    </section>
  );
}

export default Hero; // Exporte le composant Hero