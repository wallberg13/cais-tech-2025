import { UserRepository } from "@db/repositories/UserRepository";
import { User } from "@db/entities/User";
import { HttpCode, HTTPError } from "@errors/HTTPError";
import { hashProvider } from "@providers/BCrypt";
import { Log } from "@helpers/Log";

export default class UpdateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number, data: Partial<User>): Promise<void> {
    const method = "UpdateUserService.execute";
    try {
      // Podemos mudar o login, mas o login não pode ser igual ao que já existe.
      const [, userLogins] = await Promise.all([
        this.userRepository.findById(
          id,
          new HTTPError(
            "Usuário não encontrado na base de dados",
            HttpCode.BAD_REQUEST
          )
        ),
        this.userRepository.find({ login: data.login, deleted: false }),
      ]);

      const userLoginFiltered = userLogins.filter((o) => o.id !== id);

      if (userLoginFiltered.length) {
        throw new HTTPError(
          "Login já existe na base de dados.",
          HttpCode.BAD_REQUEST
        );
      }

      if (data.password) {
        data.password = await hashProvider.generateHash(data.password);
      }

      await this.userRepository.update(id, data);
    } catch (e) {
      console.log(e);
      Log(method, e, "error");
      throw e;
    }
  }
}
