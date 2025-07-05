// server/src/models/User.ts

import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs'; // Pour le hachage des mots de passe
import jwt from 'jsonwebtoken'; // Pour la génération de JWT

// ---------------------------------------------
// 1. Définition de l'interface TypeScript pour un utilisateur
// C'est crucial pour la robustesse avec TypeScript !
// ---------------------------------------------
export interface IUser extends Document {
  username: string;
  email: string;
  password?: string; // Optionnel car il ne sera pas toujours retourné, mais présent lors de la création/mise à jour
  role: 'apprenant' | 'instructeur' | 'admin'; // Définit les rôles possibles
  createdAt: Date;
  updatedAt: Date;
  // Méthodes ajoutées au schéma
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
}

// ---------------------------------------------
// 2. Définition du schéma Mongoose
// ---------------------------------------------
const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Veuillez ajouter un nom d\'utilisateur'],
      unique: true,
      trim: true, // Supprime les espaces blancs en début et fin de chaîne
      minlength: [3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères'],
    },
    email: {
      type: String,
      required: [true, 'Veuillez ajouter une adresse email'],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Veuillez ajouter une adresse email valide',
      ],
    },
    password: {
      type: String,
      required: [true, 'Veuillez ajouter un mot de passe'],
      minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
      select: false, // Ne pas renvoyer le mot de passe lors des requêtes find()
    },
    role: {
      type: String,
      enum: ['apprenant', 'instructeur', 'admin'], // Enumération des valeurs possibles
      default: 'apprenant', // Rôle par défaut
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
);

// ---------------------------------------------
// 3. Middlewares Mongoose (avant sauvegarde)
// Hacher le mot de passe avant de sauvegarder l'utilisateur
// ---------------------------------------------
UserSchema.pre<IUser>('save', async function (next) {
  // Ne hache le mot de passe que s'il a été modifié
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt); // Hacher le mot de passe
  next();
});

// ---------------------------------------------
// 4. Méthodes du Schéma (pour l'authentification)
// ---------------------------------------------

// Vérifier si le mot de passe saisi correspond au mot de passe haché dans la base de données
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password as string);
};

// Générer un JWT (JSON Web Token) pour l'authentification
UserSchema.methods.getSignedJwtToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// ---------------------------------------------
// 5. Création et exportation du modèle Mongoose
// ---------------------------------------------
const User = mongoose.model<IUser>('User', UserSchema);

export default User;