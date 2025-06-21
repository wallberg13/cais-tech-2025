import dotenv from "dotenv";
dotenv.config();
import { Knex } from "knex";

import { hashProvider } from "../../../providers/BCrypt";
import serverConfig from "../../../constants/serverConfig";

const { adminUserSeed } = serverConfig;

export async function seed(knex: Knex) {
  await knex("users").del();

  const hashedPassword = await hashProvider.generateHash(
    adminUserSeed.password
  );

  await knex("users").insert([
    {
      id: 1,
      name: adminUserSeed.name,
      login: adminUserSeed.login,
      password: hashedPassword,
      user_level: adminUserSeed.user_level,
      protected_user: adminUserSeed.protected_user,
    },
  ]);

  // Preciso fazer essa putaria para resetar a base...
  await knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`);
}
