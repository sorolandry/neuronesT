// server/src/models/Category.ts

import mongoose, { Schema, Document } from 'mongoose';
import slugify from 'slugify'; // Pour générer des slugs URL-friendly

// ---------------------------------------------
// 1. Définition de l'interface TypeScript pour une catégorie
// ---------------------------------------------
export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------
// 2. Définition du schéma Mongoose
// ---------------------------------------------
const CategorySchema: Schema<ICategory> = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Veuillez ajouter un nom de catégorie'],
      unique: true,
      trim: true,
      maxlength: [50, 'Le nom de la catégorie ne peut pas dépasser 50 caractères'],
    },
    slug: {
      type: String,
      unique: true,
      // Le slug sera généré automatiquement via un middleware 'pre'
    },
    description: {
      type: String,
      maxlength: [200, 'La description de la catégorie ne peut pas dépasser 200 caractères'],
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
);

// ---------------------------------------------
// 3. Middleware Mongoose (avant sauvegarde)
// Créer le slug à partir du nom avant de sauvegarder
// ---------------------------------------------
CategorySchema.pre<ICategory>('save', function (next) {
  // Le slug est généré uniquement si le nom a été modifié ou si c'est un nouveau document
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// ---------------------------------------------
// 4. Création et exportation du modèle Mongoose
// ---------------------------------------------
const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;