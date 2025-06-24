import { Request, Response } from "express";

import { UserRepository } from "@db/repositories/UserRepository";
import { CreateAuthService } from "../services/CreateAuthService";
import { GetAuthUserService } from "../services/GetAuthUserService";

// Nova Comentário ddddddd

<<<<<<< HEAD
// comentário curso github
=======
// Comentário do curso Git.
>>>>>>> 6ebd022f33c34021532187b64bd4463e27468e56

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

    res.json(result);
  }
}

export default new UserController();
