// src/components/Pricing.jsx

/*
  Composant Pricing pour la page d'atterrissage StreamLine.
  Présente les différents plans tarifaires disponibles pour les utilisateurs.
  Chaque plan inclut un titre, un prix, une périodicité et une liste de fonctionnalités.
  Le plan "Pro" est mis en avant avec un style distinctif.
*/

import React from 'react'; // Importe React
import { FiCheck } from 'react-icons/fi'; // Icône de coche pour les fonctionnalités

// Tableau de données pour nos plans tarifaires.
const pricingData = [
  {
    id: 1,
    name: 'Basique',
    price: '9',
    period: '/mois',
    features: [
      'Jusqu\'à 5 utilisateurs',
      'Gestion de tâches simple',
      'Support par email',
      '1 Go de stockage',
    ],
    isHighlighted: false, // Indique si ce plan doit être mis en avant
  },
  {
    id: 2,
    name: 'Pro',
    price: '29',
    period: '/mois',
    features: [
      'Jusqu\'à 20 utilisateurs',
      'Gestion de projet avancée',
      'Automatisation basique',
      'Support prioritaire',
      '10 Go de stockage',
      'Rapports personnalisés',
    ],
    isHighlighted: true, // Ce plan sera mis en avant !
  },
  {
    id: 3,
    name: 'Entreprise',
    price: 'Contacter',
    period: '', // Pas de période fixe pour ce plan
    features: [
      'Utilisateurs illimités',
      'Workflows personnalisés',
      'Automatisation avancée',
      'Support dédié 24/7',
      'Stockage illimité',
      'Intégrations sur mesure',
    ],
    isHighlighted: false,
  },
];

function Pricing() {
  return (
    <section className="pricing section-padding"> {/* Section avec padding global */}
      <div className="container"> {/* Conteneur pour centrer le contenu */}
        {/* Titre de la section */}
        <h2 className="text-center pricing__heading">
          Un plan pour chaque équipe, une solution pour chaque besoin
        </h2>
        <p className="text-center pricing__subheading">
          Choisissez le plan StreamLine qui correspond le mieux à la taille et aux ambitions de votre entreprise.
        </p>

        {/* Grille des cartes de plans tarifaires */}
        <div className="pricing__grid">
          {pricingData.map((plan) => (
            <div
              className={`pricing-card ${plan.isHighlighted ? 'pricing-card--highlighted' : ''}`}
              key={plan.id}
            >
              <h3 className="pricing-card__name">{plan.name}</h3>
              <p className="pricing-card__price">
                {plan.price !== 'Contacter' ? `$${plan.price}` : plan.price}
                {plan.period && <span className="pricing-card__period">{plan.period}</span>}
              </p>
              <ul className="pricing-card__features">
                {plan.features.map((feature, index) => (
                  <li key={index} className="pricing-card__feature-item">
                    <FiCheck size={18} className="pricing-card__feature-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
              {/* Bouton CTA spécifique à chaque plan */}
              <a
                href="#"
                className={`btn ${plan.isHighlighted ? 'btn-secondary' : 'btn-primary'} pricing-card__btn`}
              >
                {plan.name === 'Entreprise' ? 'Nous Contacter' : 'Choisir ce plan'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing; // Exporte le composant Pricing