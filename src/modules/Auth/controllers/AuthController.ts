import { Request, Response } from "express";

import { UserRepository } from "@db/repositories/UserRepository";
import { CreateAuthService } from "../services/CreateAuthService";
import { GetAuthUserService } from "../services/GetAuthUserService";
// comentário do curso de git
// isso é um teste
//seu paig eh gay
class UserController {
  async create(req: Request, res: Response) {
    const service = new CreateAuthService(new UserRepository());
    const { login, password } = req.body;

    const result = await service.execute(login, password);
// quem ler é gay
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
