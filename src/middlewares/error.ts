import { TransformToHTTPError } from "@helpers/handles";
import { Response, Request, NextFunction, ErrorRequestHandler } from "express";
import { HTTPError } from "../shared/errors/HTTPError";

/**
 * Callback para padronização dps erros levantados pela API
 */
export function errorMid(
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) {
  if (err instanceof HTTPError) {
    res.status(err.httpCode).json({
      error: true,
      message: err.message,
      data: err.details,
      timestamp: err.timestamp,
    });
    return;
  }

  // Deve ter um: ShouldNotify

  const newErr = TransformToHTTPError(err, "pt");

  res.status(newErr.httpCode).json({
    error: true,
    message: newErr.message,
    data: newErr.details,
    timestamp: new Date().getTime(),
  });
}
