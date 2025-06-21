import { User } from "../entities/User";
import BaseRepository from "./BaseRepository";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super("users");
  }

  async update(id: number, data: Partial<User>) {
    await this.knex(this.table)
      .where({ id })
      .update({ ...data, updated_at: new Date() });
  }
}

export default new UserRepository();
