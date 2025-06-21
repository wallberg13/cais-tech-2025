import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();

    // Name, Login and Password
    table.string("name").notNullable();
    table.string("login").notNullable();
    table.string("password").notNullable();

    // Info de Permissão (SUPERADMIN, ADMIN, USER) => VAMOS POR COMO STRING, NÃO ENUM
    table.string("user_level").notNullable();

    table.boolean("protected_user").notNullable().defaultTo(false);

    table.timestamps(true, true); // created_at and updated_at

    table.boolean("active").defaultTo(true);
    table.boolean("deleted").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
