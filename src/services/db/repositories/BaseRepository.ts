import { Knex } from "knex";
import db from "../connection";
import { Optional } from "utility-types";

export default class BaseRepository<T extends object> {
  protected table: string;
  protected knex: Knex;

  constructor(tableName: string) {
    this.table = tableName;
    this.knex = db;
  }

  async create(data: Optional<T>[]): Promise<void> {
    await this.knex(this.table).insert(data);
  }

  async find<Z>(filter: Optional<T>, err: Z | null = null): Promise<T[]> {
    const ret = await this.knex(this.table).where(filter);

    if (err && !ret.length) {
      throw err;
    }

    return ret;
  }

  async findIn(
    field: keyof T,
    values: (string | number)[],
    filter: Optional<T> | null = null
  ): Promise<T[]> {
    const query = this.knex(this.table).whereIn(field as string, values);

    if (filter !== null) {
      query.where(filter);
    }

    return await query;
  }

  // Toda tabela precisa ter uma coluna de removido.
  async findAll(): Promise<T[]> {
    return await this.knex(this.table).select("*").where({ deleted: false });
  }

  async findById<Z>(id: number, err: Z | null = null): Promise<T> {
    const ret = await this.knex(this.table).where({ id }).first();

    if (err && !ret) {
      throw err;
    }

    return ret;
  }

  /**
   * Todo mundo precisa precisa ter um user_id dentro. A unica classe
   * que não possui, é a de usuário.
   */
  async update(id: number, data: Partial<T>, user_id: number): Promise<void> {
    await this.knex(this.table)
      .where({ id })
      .update({ ...data, updated_at: new Date(), updated_by: user_id });
  }

  async delete(id: number): Promise<number> {
    return await this.knex(this.table)
      .where({ id })
      .update({ deleted: true, updated_at: new Date() });
  }
}
