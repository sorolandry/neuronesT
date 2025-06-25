// src/components/Features.jsx

/*
  Composant Features pour la page d'atterrissage StreamLine.
  Présente les fonctionnalités clés de la plateforme à travers une grille de cartes.
  Utilise un tableau de données et la méthode .map() pour générer dynamiquement les fonctionnalités.
*/

import React from 'react'; // Importe React
import { FiCheckSquare, FiTarget, FiActivity } from 'react-icons/fi'; // Importe des icônes pour les fonctionnalités

// Tableau de données pour nos fonctionnalités.
// Chaque objet contient les informations nécessaires pour une carte de fonctionnalité.
const featuresData = [
  {
    icon: <FiCheckSquare size={40} />, // Icône pour la gestion des tâches
    title: 'Gestion de projet intuitive',
    description: 'Suivez l\'avancement, attribuez les tâches et respectez les délais avec des outils simples et puissants.',
  },
  {
    icon: <FiTarget size={40} />, // Icône pour l'automatisation
    title: 'Automatisation des workflows',
    description: 'Automatisez les tâches répétitives pour libérer votre équipe et augmenter l\'efficacité.',
  },
  {
    icon: <FiActivity size={40} />, // Icône pour l'analyse
    title: 'Tableaux de bord personnalisés',
    description: 'Visualisez vos données clés, identifiez les goulots d\'étranglement et prenez des décisions éclairées.',
  },
];

function Features() {
  return (
    <section className="features section-padding"> {/* Section avec padding global */}
      <div className="container"> {/* Conteneur pour centrer le contenu */}
        {/* Titre de la section */}
        <h2 className="text-center features__heading">
          Une plateforme conçue pour votre succès
        </h2>
        <p className="text-center features__subheading">
          Découvrez comment StreamLine simplifie la collaboration et optimise votre productivité.
        </p>

        {/* Grille des cartes de fonctionnalités */}
        <div className="features__grid">
          {/*
            Utilisation de la méthode .map() sur notre tableau featuresData.
            Pour chaque `feature` dans `featuresData`, nous retournons un élément JSX (la carte de fonctionnalité).
            La prop `key` est très importante en React lors de l'utilisation de listes pour aider React à identifier chaque élément de manière unique
            et optimiser les mises à jour. Ici, nous utilisons le titre comme clé (en général, un ID unique est préférable si disponible).
          */}
          {featuresData.map((feature, index) => (
            <div className="feature-card" key={index}> {/* key={index} est utilisé ici pour la simplicité, mais un ID unique est préférable si disponible. */}
              <div className="feature-card__icon">
                {feature.icon} {/* Affiche l'icône */}
              </div>
              <h3 className="feature-card__title">{feature.title}</h3> {/* Titre de la fonctionnalité */}
              <p className="feature-card__description">{feature.description}</p> {/* Description */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features; // Exporte le composant Features