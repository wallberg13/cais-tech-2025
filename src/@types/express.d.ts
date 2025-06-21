enum UserLevelEnum {
  SUPERADMIN = "SUPERADMIN", // Cria entidades
  ADMIN = "ADMIN", // Cria cadastros dentro da entidade
  USER = "USER", // Faz movimentações nos patrimonios.
}

interface Subscription {
  id: number;
  user_level: UserLevelEnum;
  protected_user: boolean;
}

declare namespace Express {
  export interface Request {
    userPermission: Subscription;
  }
}
