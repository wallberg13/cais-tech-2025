import { Request, Response } from "express";
//Maria Eduarda

import { UserRepository } from "@db/repositories/UserRepository";
import { CreateAuthService } from "../services/CreateAuthService";
import { GetAuthUserService } from "../services/GetAuthUserService";

// Comentário do curso Git.

class UserController {
  async create(req: Request, res: Response) {
    // const service = new CreateAuthService(new UserRepository());
    // const { login, password } = req.body;

    // const result = await service.execute(login, password);

    res.json({ joinha: "true" });
  }

  async index(req: Request, res: Response) {
    const { id } = req.userPermission;

    const service = new GetAuthUserService(new UserRepository());
    const result = await service.execute(id);
//tech 2025
    res.json(result);
  }
}
//L
export default new UserController();
//ok
