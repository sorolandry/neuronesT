// server/src/models/Lesson.ts

import mongoose, { Schema, Document } from 'mongoose';
import { ICourse } from './Course'; // Importer l'interface Course

// ---------------------------------------------
// 1. Définition de l'interface TypeScript pour une leçon
// ---------------------------------------------
export interface ILesson extends Document {
  title: string;
  description?: string;
  videoUrl: string;
  duration: number; // Durée de la vidéo en secondes
  order: number; // Ordre de la leçon au sein d'une section ou du cours
  course: mongoose.Types.ObjectId | ICourse; // Référence au cours parent
  section?: string; // Nom de la section si les leçons sont regroupées (ex: "Introduction", "Module 1")
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------
// 2. Définition du schéma Mongoose
// ---------------------------------------------
const LessonSchema: Schema<ILesson> = new Schema<ILesson>(
  {
    title: {
      type: String,
      required: [true, 'Veuillez ajouter un titre pour la leçon'],
      trim: true,
      maxlength: [100, 'Le titre de la leçon ne peut pas dépasser 100 caractères'],
    },
    description: {
      type: String,
      maxlength: [500, 'La description de la leçon ne peut pas dépasser 500 caractères'],
    },
    videoUrl: {
      type: String,
      required: [true, 'Veuillez ajouter une URL de vidéo pour la leçon'],
      match: [
        /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
        'Veuillez ajouter une URL de vidéo valide (doit être une URL)',
      ],
    },
    duration: {
      type: Number,
      required: [true, 'Veuillez ajouter la durée de la leçon en secondes'],
      min: [1, 'La durée doit être au moins de 1 seconde'],
    },
    order: {
      type: Number,
      required: [true, 'Veuillez définir l\'ordre de cette leçon'],
      min: [0, 'L\'ordre doit être un nombre positif'],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course', // Référence au modèle 'Course'
      required: [true, 'Une leçon doit être associée à un cours'],
    },
    section: {
      type: String,
      trim: true,
      maxlength: [50, 'Le nom de la section ne peut pas dépasser 50 caractères'],
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
);

// ---------------------------------------------
// 3. Middlewares Mongoose (Mise à jour du nombre total de leçons dans le cours)
// ---------------------------------------------

// Ce middleware s'exécute APRÈS qu'une leçon a été sauvegardée ou supprimée.
// Il met à jour le champ `totalLessons` dans le document `Course` associé.
LessonSchema.post('save', async function () {
  await (this.constructor as any).getCourseLessonCount(this.course);
});

LessonSchema.post('remove', async function () {
  await (this.constructor as any).getCourseLessonCount(this.course);
});

// Méthode statique pour calculer et mettre à jour le nombre de leçons d'un cours
LessonSchema.statics.getCourseLessonCount = async function (courseId: mongoose.Types.ObjectId) {
  const obj = await this.aggregate([
    {
      $match: { course: courseId },
    },
    {
      $group: {
        _id: '$course',
        totalLessons: { $sum: 1 },
      },
    },
  ]);

  try {
    await mongoose.model('Course').findByIdAndUpdate(courseId, {
      totalLessons: obj.length > 0 ? obj[0].totalLessons : 0,
    });
  } catch (err) {
    console.error(err);
  }
};


// ---------------------------------------------
// 4. Création et exportation du modèle Mongoose
// ---------------------------------------------
const Lesson = mongoose.model<ILesson>('Lesson', LessonSchema);

export default Lesson;