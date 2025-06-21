import { Response, Request } from "express";

/**
 * Middleware para retornar rota de erro.
 */
export function notFoundMid(req: Request, res: Response) {
  res.status(404).json({
    error: true,
    timestamp: new Date(),
    message: "¿O que Procuras, Amigo?",
  });
}
