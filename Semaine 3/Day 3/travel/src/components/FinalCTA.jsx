// src/components/FinalCTA.jsx

/*
  Composant FinalCTA pour la page d'atterrissage StreamLine.
  Présente un dernier appel à l'action percutant pour encourager l'inscription
  ou le contact.
*/

import React from 'react'; // Importe React

function FinalCTA() {
  return (
    <section className="final-cta section-padding"> {/* Utilise notre classe utilitaire pour le padding */}
      <div className="container text-center"> {/* Centrage du contenu et largeur max */}
        {/* Titre de l'appel à l'action */}
        <h2 className="final-cta__heading">
          Prêt à transformer votre gestion de projet ?
        </h2>

        {/* Description engageante */}
        <p className="final-cta__description">
          Rejoignez des milliers d'équipes qui ont déjà optimisé leurs workflows avec StreamLine.
          Votre productivité n'attend plus !
        </p>

        {/* Bouton d'appel à l'action */}
        <a href="#signup" className="btn btn-secondary final-cta__btn">
          Inscrivez-vous Gratuitement !
        </a>
      </div>
    </section>
  );
}

export default FinalCTA; // Exporte le composant FinalCTA