// server/src/server.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db';
import { errorHandler } from './middleware/errorMiddleware';

// Importez vos routes
import authRoutes from './routes/authRoutes'; // Nouvelle ligne

// Charger les variables d'environnement
dotenv.config();

// Connecter à la base de données
connectDB();

const app: Application = express();

// Middlewares de sécurité essentiels
app.use(express.json()); // Permet à Express de parser le corps des requêtes en JSON
app.use(cors()); // Active CORS pour toutes les requêtes (ajuster en production)
app.use(helmet()); // Sécurise les en-têtes HTTP
app.use(mongoSanitize()); // Prévient l'injection de code NoSQL

// Limiteur de requêtes pour prévenir les attaques de force brute
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre (15 minutes)
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer après 15 minutes.'
});
app.use(limiter);

// Définition de routes de test (sera remplacé par nos vraies routes)
app.get('/', (req: Request, res: Response) => {
  res.send('API is running (TypeScript version)...');
});

// Monter les routes d'authentification
app.use('/api/auth', authRoutes); // Nouvelle ligne : Toutes les routes définies dans authRoutes.ts
                                  // seront préfixées par /api/auth

// Middleware de gestion des erreurs (doit être le dernier middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});