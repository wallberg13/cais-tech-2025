import { UserRepository } from "@db/repositories/UserRepository";
import { Log } from "@helpers/Log";
import { omit } from "lodash";

export default class IndexUsersService {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const method = "IndexUsersService.execute";

    try {
      const users = await this.userRepository.findAll();

      const usersPasswordEmitted = users.map((o) => omit(o, ["password"]));

      return usersPasswordEmitted;
    } catch (e) {
      Log(method, e, "error");
      throw e;
    }
  }
}
