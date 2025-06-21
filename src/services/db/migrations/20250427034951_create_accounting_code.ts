import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("accounting_codes", (table) => {
    table.increments("id").primary();
    table.string("code").notNullable();
    table.string("name").notNullable();
    table.decimal("anual_depreciation_rate", 10, 2).notNullable();
    table.decimal("residual", 10, 2).notNullable();

    table.timestamps(false, true); // created_at and updated_at

    table.boolean("active").defaultTo(true);
    table.boolean("deleted").defaultTo(false);

    // A partir desse momento, todas as tabelas precisa ter um usuário criador.
    table
      .integer("created_by")
      .unsigned()
      .references("users.id")
      .notNullable()
      .comment("Referencia para usuário");

    table
      .integer("updated_by")
      .unsigned()
      .references("users.id")
      .notNullable()
      .comment("Referencia para usuário");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("accounting_codes");
}
