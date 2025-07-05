// server/src/middleware/asyncHandler.ts
import { Request, Response, NextFunction } from 'express';

// Ce type définit une fonction de contrôleur Express asynchrone
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

/**
 * Wrapper pour les fonctions de contrôleur asynchrones.
 * Il capture toutes les erreurs et les passe au middleware de gestion des erreurs d'Express.
 */
const asyncHandler = (fn: AsyncFunction) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;