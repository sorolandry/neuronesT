// server/src/models/Enrollment.ts

import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User'; // Importer l'interface User
import { ICourse } from './Course'; // Importer l'interface Course

// ---------------------------------------------
// 1. Définition de l'interface TypeScript pour une inscription
// ---------------------------------------------
export interface IEnrollment extends Document {
  user: mongoose.Types.ObjectId | IUser; // Référence à l'utilisateur inscrit
  course: mongoose.Types.ObjectId | ICourse; // Référence au cours auquel l'utilisateur est inscrit
  enrolledAt: Date; // Date d'inscription
  progress?: number; // Progression de l'utilisateur dans le cours (ex: 0-100%) - Optionnel pour le MVP
  completedLessons?: mongoose.Types.ObjectId[]; // Tableau des IDs des leçons complétées - Optionnel pour le MVP
}

// ---------------------------------------------
// 2. Définition du schéma Mongoose
// ---------------------------------------------
const EnrollmentSchema: Schema<IEnrollment> = new Schema<IEnrollment>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Référence au modèle 'User'
      required: [true, 'L\'inscription doit être associée à un utilisateur'],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course', // Référence au modèle 'Course'
      required: [true, 'L\'inscription doit être associée à un cours'],
    },
    enrolledAt: {
      type: Date,
      default: Date.now, // Date d'inscription par défaut à la date actuelle
    },
    // Ces champs sont optionnels pour le MVP, mais bons à prévoir
    progress: {
      type: Number,
      default: 0,
      min: [0, 'La progression ne peut pas être négative'],
      max: [100, 'La progression ne peut pas dépasser 100%'],
    },
    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson', // Référence au modèle 'Lesson'
      },
    ],
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
);

// ---------------------------------------------
// 3. Empêcher l'utilisateur de s'inscrire plusieurs fois au même cours
// ---------------------------------------------
EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// ---------------------------------------------
// 4. Création et exportation du modèle Mongoose
// ---------------------------------------------
const Enrollment = mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);

export default Enrollment;

