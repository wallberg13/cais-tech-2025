export enum UserLevelEnum {
  SUPERADMIN = "SUPERADMIN", // Cria entidades
  ADMIN = "ADMIN", // Cria cadastros dentro da entidade
  USER = "USER", // Faz movimentações nos patrimonios.
}

export interface User {
  id?: number;

  name: string;
  login: string;
  password: string;
  user_level: UserLevelEnum;
  protected_user?: boolean;

  deleted?: boolean;
  active?: boolean;

  created_at?: Date;
  updated_at?: Date;
}
