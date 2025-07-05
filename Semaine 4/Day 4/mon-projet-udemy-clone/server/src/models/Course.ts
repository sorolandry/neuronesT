// server/src/models/Course.ts

import mongoose, { Schema, Document } from 'mongoose';
import slugify from 'slugify'; // Pour le slug du cours
import { IUser } from './User'; // Importer l'interface User
import { ICategory } from './Category'; // Importer l'interface Category

// ---------------------------------------------
// 1. Définition de l'interface TypeScript pour un cours
// ---------------------------------------------
export interface ICourse extends Document {
  title: string;
  subtitle?: string; // Sous-titre optionnel
  description: string;
  price: number;
  instructor: mongoose.Types.ObjectId | IUser; // Référence à l'utilisateur (instructeur)
  category: mongoose.Types.ObjectId | ICategory; // Référence à la catégorie
  thumbnail: string; // URL de l'image de couverture
  previewVideo?: string; // URL de la vidéo d'aperçu du cours
  language: string;
  level: 'débutant' | 'intermédiaire' | 'expert' | 'tous les niveaux';
  ratingsAverage?: number; // Moyenne des évaluations
  ratingsQuantity?: number; // Nombre d'évaluations
  totalLessons?: number; // Nombre total de leçons (calculé)
  isPublished: boolean; // Statut de publication du cours
  createdAt: Date;
  updatedAt: Date;
  slug: string; // Slug pour l'URL
}

// ---------------------------------------------
// 2. Définition du schéma Mongoose
// ---------------------------------------------
const CourseSchema: Schema<ICourse> = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, 'Veuillez ajouter un titre de cours'],
      trim: true,
      maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères'],
    },
    subtitle: {
      type: String,
      maxlength: [200, 'Le sous-titre ne peut pas dépasser 200 caractères'],
    },
    description: {
      type: String,
      required: [true, 'Veuillez ajouter une description de cours'],
      minlength: [50, 'La description doit contenir au moins 50 caractères'],
    },
    price: {
      type: Number,
      required: [true, 'Veuillez ajouter un prix au cours'],
      default: 0, // Peut être 0 pour les cours gratuits
      min: [0, 'Le prix ne peut pas être négatif'],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Référence au modèle 'User'
      required: [true, 'Veuillez spécifier un instructeur pour ce cours'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Référence au modèle 'Category'
      required: [true, 'Veuillez spécifier une catégorie pour ce cours'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Veuillez ajouter une image de couverture pour le cours'],
      match: [
        /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
        'Veuillez ajouter une URL de vignette valide (doit être une URL)',
      ],
    },
    previewVideo: {
      type: String,
      match: [
        /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
        'Veuillez ajouter une URL de vidéo d\'aperçu valide (doit être une URL)',
      ],
    },
    language: {
      type: String,
      required: [true, 'Veuillez spécifier la langue du cours'],
      default: 'Français',
    },
    level: {
      type: String,
      enum: ['débutant', 'intermédiaire', 'expert', 'tous les niveaux'],
      default: 'tous les niveaux',
    },
    ratingsAverage: {
      type: Number,
      min: [1, 'La note moyenne doit être supérieure ou égale à 1'],
      max: [5, 'La note moyenne doit être inférieure ou égale à 5'],
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    totalLessons: {
      type: Number,
      default: 0, // Sera mis à jour lors de l'ajout/suppression de leçons
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    slug: String, // Sera généré automatiquement
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt
    toJSON: { virtuals: true }, // Pour inclure les virtuals lors de la conversion en JSON
    toObject: { virtuals: true }, // Pour inclure les virtuals lors de la conversion en objet
  }
);

// ---------------------------------------------
// 3. Middlewares Mongoose (avant sauvegarde)
// Créer le slug à partir du titre avant de sauvegarder
// ---------------------------------------------
CourseSchema.pre<ICourse>('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// ---------------------------------------------
// 4. Virtuals (Propriétés Virtuelles)
// ---------------------------------------------
// Inverse populate avec "lessons"
// Ceci ne stocke pas de données dans la base, mais permet de joindre
// les leçons liées au cours quand on récupère un cours.
CourseSchema.virtual('lessons', {
  ref: 'Lesson', // Le modèle à référencer
  localField: '_id', // Le champ de ce modèle (Course) qui est lié
  foreignField: 'course', // Le champ du modèle référencé (Lesson) qui contient la référence
  justOne: false, // Indique que nous attendons plusieurs documents (plusieurs leçons par cours)
});


// ---------------------------------------------
// 5. Création et exportation du modèle Mongoose
// ---------------------------------------------
const Course = mongoose.model<ICourse>('Course', CourseSchema);

export default Course;