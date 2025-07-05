// server/src/routes/authRoutes.ts

import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = express.Router(); // Crée une nouvelle instance de routeur Express

// Définition des routes d'authentification
router.post('/register', registerUser); // Route pour l'inscription
router.post('/login', loginUser);     // Route pour la connexion

export default router;