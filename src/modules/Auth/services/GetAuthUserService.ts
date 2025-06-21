import { UserRepository } from "@db/repositories/UserRepository";
import { HttpCode, HTTPError } from "@errors/HTTPError";
import { Log } from "@helpers/Log";

export class GetAuthUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(user_id: number) {
    const method = "GetAuthUserService.execute";
    const ERROR_MESSAGE = "Usuário não existe ou possui credencial errada!";
    const UNAUTH_ERROR = new HTTPError(ERROR_MESSAGE, HttpCode.UNAUTHORIZED);

    try {
      const userDB = await this.userRepository.findById(user_id, UNAUTH_ERROR);

      const { name } = userDB;

      return { user: { name } };
    } catch (e) {
      Log(method, e, "error");
      throw e;
    }
  }
}
