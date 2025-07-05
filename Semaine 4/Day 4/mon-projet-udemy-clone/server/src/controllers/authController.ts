// server/src/controllers/authController.ts

import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../middleware/asyncHandler'; // Middleware pour gérer les erreurs asynchrones
import User from '../models/User'; // Notre modèle User
import { CustomError } from '../middleware/errorMiddleware'; // Nous utiliserons cette interface d'erreur personnalisée

// ---------------------------------------------
// @desc    Enregistrer un nouvel utilisateur
// @route   POST /api/auth/register
// @access  Public
// ---------------------------------------------
const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });

    if (userExists) {
      // Utilisez notre gestionnaire d'erreurs personnalisé
      return next(new CustomError('Un utilisateur avec cet email existe déjà', 400));
    }

    // Créer un nouvel utilisateur
    const user = await User.create({
      username,
      email,
      password,
      role, // Le rôle peut être 'apprenant', 'instructeur', 'admin' - le modèle gère le défaut
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          token: user.getSignedJwtToken(), // Générer un JWT
        },
      });
    } else {
      return next(new CustomError('Données utilisateur invalides', 400));
    }
  }
);

// ---------------------------------------------
// @desc    Authentifier un utilisateur et obtenir un token
// @route   POST /api/auth/login
// @access  Public
// ---------------------------------------------
const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Vérifier si l'email et le mot de passe sont fournis
    if (!email || !password) {
      return next(new CustomError('Veuillez entrer un email et un mot de passe', 400));
    }

    // Trouver l'utilisateur par email (sélectionner le mot de passe car il est `select: false` dans le modèle)
    const user = await User.findOne({ email }).select('+password'); // Récupérer le mot de passe haché

    // Vérifier si l'utilisateur existe et si le mot de passe correspond
    if (!user || !(await user.matchPassword(password))) {
      return next(new CustomError('Identifiants invalides', 401)); // 401 Unauthorized
    }

    // Si tout est bon, renvoyer le token
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: user.getSignedJwtToken(), // Générer un JWT
      },
    });
  }
);

export { registerUser, loginUser };