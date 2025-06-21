import { Request, Response } from "express";
import CreateUserService from "../services/User/CreateUserService";
import UpdateUserService from "../services/User/UpdateUserService";
import DeleteUserService from "../services/User/DeleteUserService";
import IndexUsersService from "../services/User/IndexUsersService";

import { UserRepository } from "@db/repositories/UserRepository";

class UserController {
  async create(req: Request, res: Response) {
    const service = new CreateUserService(new UserRepository());
    const result = await service.execute(req.body);
    res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const service = new UpdateUserService(new UserRepository());
    const result = await service.execute(Number(req.params.id), req.body);
    res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const service = new DeleteUserService(new UserRepository());
    await service.execute(Number(req.params.id));
    res.status(204).send();
  }

  async index(req: Request, res: Response) {
    const service = new IndexUsersService(new UserRepository());
    const result = await service.execute();
    res.status(200).json(result);
  }
}

export default new UserController();
