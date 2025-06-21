import { verify } from "jsonwebtoken";
import { HttpCode, HTTPError } from "@errors/HTTPError";
import { Request, Response, NextFunction } from "express";
import serverConfig from "@constants/serverConfig";

const { jwtSettings } = serverConfig;

export async function EnsureAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const DEFAULT_ERR = new HTTPError(
    "Usuário não autenticado",
    HttpCode.UNAUTHORIZED
  );

  if (!authorization) {
    throw DEFAULT_ERR;
  }

  const [, token] = authorization.split(" ");

  try {
    const { sub } = verify(token, jwtSettings.secret);

    const userPermission = JSON.parse(sub as string);

    // Injetando as permissões do usuário
    req.userPermission = userPermission;

    /**
     * Aqui vamos adicionar outras opções de usuário.
     */

    next();
  } catch (e) {
    throw DEFAULT_ERR;
  }
}
