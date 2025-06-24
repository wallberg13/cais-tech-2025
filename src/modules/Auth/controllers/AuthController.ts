import { Request, Response } from "express";

import { UserRepository } from "@db/repositories/UserRepository";
import { CreateAuthService } from "../services/CreateAuthService";
import { GetAuthUserService } from "../services/GetAuthUserService";
// Loucuras de Amor
// Amores Amados

//vala nossa senhora
class UserController {
  async create(req: Request, res: Response) {
    const service = new CreateAuthService(new UserRepository());
    const { login, password } = req.body;

    const result = await service.execute(login, password);

    res.json(result);
  }

  async index(req: Request, res: Response) {
    const { id } = req.userPermission;

    const service = new GetAuthUserService(new UserRepository());
    const result = await service.execute(id);

    res.json(result);
  }
}

export default new UserController();
