import { UserRepository } from "@db/repositories/UserRepository";
import { HttpCode, HTTPError } from "@errors/HTTPError";
import { Log } from "@helpers/Log";

export default class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number): Promise<void> {
    const method = "DeleteUserService.execute";

    try {
      const [userDB] = await this.userRepository.find(
        { id, deleted: false },
        new HTTPError(
          "Usuário não encontrado na base de dados",
          HttpCode.BAD_REQUEST
        )
      );

      if (userDB.protected_user) {
        throw new HTTPError(
          "Não é possível excluir usuário protegido.",
          HttpCode.BAD_REQUEST
        );
      }

      await this.userRepository.delete(id);
    } catch (e) {
      Log(method, e, "error"); // instrumenta o erro??
      throw e;
    }
  }
}
