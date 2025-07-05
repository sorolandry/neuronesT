// server/src/middleware/errorMiddleware.ts

import { Request, Response, NextFunction } from 'express';

// Interface pour les erreurs personnalisées que nous pouvons lancer
export interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500; // Utilise le code d'état de l'erreur ou 500 par défaut
  const message = err.message || 'Erreur serveur interne'; // Message d'erreur générique

  // Pour les erreurs de validation Mongoose
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors as any).map((val: any) => val.message);
    return res.status(400).json({
      success: false,
      error: messages.join(', '),
    });
  }

  // Pour les erreurs de duplication de clé Mongoose (code 11000)
  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue)[0];
    const message = `La valeur dupliquée pour le champ ${field} existe déjà.`;
    return res.status(400).json({
      success: false,
      error: message,
    });
  }

  // Pour les erreurs de CastError (ex: ID invalide)
  if (err.name === 'CastError') {
    const message = `Ressource non trouvée avec l'ID ${err.value}`;
    return res.status(404).json({
      success: false,
      error: message,
    });
  }


  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack, // Affiche le stack trace uniquement en dev
  });
};

export { errorHandler, CustomError }; // Exporter CustomError