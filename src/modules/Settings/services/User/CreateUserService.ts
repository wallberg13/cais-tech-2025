import { UserRepository } from "@db/repositories/UserRepository";
import { User } from "@db/entities/User";
import { Log } from "@helpers/Log";
import { HttpCode, HTTPError } from "@errors/HTTPError";
import { hashProvider } from "@providers/BCrypt";

export default class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(users: User[]): Promise<void> {
    const method = "CreateUserService.execute";

    try {
      const logins = users.map((u) => u.login);

      const loginsOnDB = await this.userRepository.findIn("login", logins);

      if (loginsOnDB.length) {
        throw new HTTPError(
          "Alguns logins já estão na base de dados",
          HttpCode.BAD_REQUEST,
          loginsOnDB.map((o) => o.login)
        );
      }

      // Put hash on password.
      const usersToCreate = await Promise.all(
        users.map(async (o) => {
          o.password = await hashProvider.generateHash(o.password);

          return o;
        })
      );

      await this.userRepository.create(usersToCreate);
    } catch (e) {
      Log(method, e, "error"); // Cabe um "process error" aqui, ou um erro handle.
      throw e;
    }
  }
}
