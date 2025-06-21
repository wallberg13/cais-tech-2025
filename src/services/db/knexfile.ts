import dotenv from "dotenv";
import { Knex } from "knex";

// Config env path
dotenv.config({ path: "../../../.env" });

const config: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.POSTGRESQL_DB_HOST,
    port: Number(process.env.POSTGRESQL_DB_PORT),
    database: process.env.POSTGRESQL_DB_DATABASE,
    user: process.env.POSTGRESQL_DB_USERNAME,
    password: process.env.POSTGRESQL_DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "./migrations",
  },
  useNullAsDefault: true,
};

export default config;
