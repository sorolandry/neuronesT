// src/components/Testimonials.jsx

/*
  Composant Testimonials pour la page d'atterrissage StreamLine.
  Affiche une sélection de témoignages clients pour renforcer la crédibilité.
  Utilise un tableau de données pour générer dynamiquement les cartes de témoignages.
*/

import React from 'react'; // Importe React
import { FiStar } from 'react-icons/fi'; // Icône d'étoile (optionnel, pour une note par exemple)

// Tableau de données pour nos témoignages.
const testimonialsData = [
  {
    id: 1, // Un ID unique est idéal pour la prop 'key'
    quote: "Depuis que nous utilisons StreamLine, la gestion de nos projets est devenue incroyablement fluide. L'automatisation a libéré un temps précieux pour mon équipe. Un outil indispensable !",
    author: "Sophie Dupont",
    title: "Directrice Marketing, Agence Creative",
    rating: 5, // Exemple de données supplémentaires
  },
  {
    id: 2,
    quote: "J'étais sceptique au début, mais StreamLine a dépassé toutes mes attentes. L'interface est intuitive et le support client est réactif. Je le recommande vivement à toutes les PME !",
    author: "Marc Lefevre",
    title: "CEO, Startup Innovante",
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="testimonials section-padding"> {/* Section avec padding global */}
      <div className="container"> {/* Conteneur pour centrer le contenu */}
        {/* Titre de la section */}
        <h2 className="text-center testimonials__heading">
          Ils nous font confiance
        </h2>
        <p className="text-center testimonials__subheading">
          Découvrez ce que nos clients disent de StreamLine et de son impact sur leur productivité.
        </p>

        {/* Grille des cartes de témoignages */}
        <div className="testimonials__grid">
          {testimonialsData.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}> {/* Utilisation de l'ID comme clé */}
              <div className="testimonial-card__quote">
                <p>"{testimonial.quote}"</p>
              </div>
              <div className="testimonial-card__author-info">
                {/* Optionnel: Afficher des étoiles de notation */}
                <div className="testimonial-card__rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} size={18} fill="#FFD700" stroke="#FFD700" /> // Étoile pleine
                  ))}
                </div>
                <p className="testimonial-card__author">{testimonial.author}</p>
                <p className="testimonial-card__title">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials; // Exporte le composant Testimonials