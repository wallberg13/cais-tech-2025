import { UserLevelEnum } from "../services/db/entities/User";
import { StringValue } from "ms";

interface DBConfig {
  host: String;
  port: Number;
  database: String;
  user: String;
  password: String;
}

export interface AdminUserSeed {
  name: string;
  login: string;
  password: string;
  user_level: UserLevelEnum;
  protected_user: boolean;
}

export interface JWTSetting {
  secret: string;
  expiresIn: StringValue;
}

export interface ServerConfig {
  host: String;
  port: Number;
  dbConfig: DBConfig;
  adminUserSeed: AdminUserSeed;
  main: string;
  botToken?: string;
  botChats: number[];
  timezone: string;
  jwtSettings: JWTSetting;
}

const dbConfig: DBConfig = {
  host: process.env.POSTGRESQL_DB_HOST || "localhost",
  port: Number(process.env.POSTGRESQL_DB_PORT) || 5432,
  database: process.env.POSTGRESQL_DB_DATABASE || "admin",
  user: process.env.POSTGRESQL_DB_USERNAME || "admin",
  password: process.env.POSTGRESQL_DB_PASSWORD || "admin",
};

const adminUserSeed: AdminUserSeed = {
  name: process.env.USER_ADMIN_NAME || "Administrador do Sistema",
  login: process.env.USER_ADMIN_LOGIN || "teco@tecoteco.com",
  password: process.env.USER_ADMIN_PASSWORD || "teco1234",
  user_level: UserLevelEnum.SUPERADMIN,
  protected_user: true,
};

const jwtSettings: JWTSetting = {
  secret: process.env.JWT_SECRET || "Teco Teco 1234",
  expiresIn: (process.env.JWT_EXPIRES_IN as StringValue) || "1d",
};

const serverConfig: ServerConfig = {
  host: process.env.APP_HOST || "localhost",
  port: Number(process.env.APP_PORT) || 5000,
  dbConfig,
  adminUserSeed,
  main: "src/app.ts",
  botToken: process.env.TELEGRAM_BOT_TOKEN,
  botChats: JSON.parse(process.env.TELEGRAM_CHATS || "[]"),
  timezone: process.env.TIMEZONE || "America/Fortaleza",
  jwtSettings,
};

export default serverConfig;
