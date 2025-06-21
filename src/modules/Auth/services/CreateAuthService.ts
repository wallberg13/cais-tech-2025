import serverConfig from "@constants/serverConfig";
import { UserRepository } from "@db/repositories/UserRepository";
import { HttpCode, HTTPError } from "@errors/HTTPError";
import { Log } from "@helpers/Log";
import { hashProvider } from "@providers/BCrypt";
import { sign } from "jsonwebtoken";

const { jwtSettings } = serverConfig;

export class CreateAuthService {
  constructor(private userRepository: UserRepository) {}

  async execute(login: string, password: string) {
    const method = "CreateAuthService.execute";
    const ERROR_MESSAGE = "Usuário não existe ou possui credencial errada!";
    const UNAUTH_ERROR = new HTTPError(ERROR_MESSAGE, HttpCode.UNAUTHORIZED);

    try {
      const [userDB] = await this.userRepository.find({ login }, UNAUTH_ERROR);

      const checkPass = await hashProvider.compare(password, userDB.password);

      if (!checkPass) {
        throw UNAUTH_ERROR;
      }

      const { name } = userDB;

      const token = sign({}, jwtSettings.secret, {
        subject: JSON.stringify({
          id: userDB.id,
          user_level: userDB.user_level,
          protected_user: userDB.protected_user,
        }),
        expiresIn: jwtSettings.expiresIn,
      });

      return { token, user: { name } };
    } catch (e) {
      Log(method, e, "error");
      throw e;
    }
  }
}
