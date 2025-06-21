import z from "zod";
import { UserLevelEnum } from "@db/entities/User";

/**
 * Schemas base.
 */
const UserIdParamSchema = {
  params: z.object({
    id: z.string({ required_error: "ID obrigatório" }),
  }),
};

const UserSchema = {
  body: z
    .array(
      z.object({
        name: z.string({ required_error: "Nome obrigatório" }).nonempty(),
        login: z.string({ required_error: "Login obrigatório" }),
        password: z.string({ required_error: "Senha obrigatória" }).min(8),
        user_level: z.nativeEnum(UserLevelEnum),
      })
    )
    .min(1),
};

/**
 * Schemas do Crud
 */
export const CreateUserSchema = z.object(UserSchema);

export const UpdateUserSchema = z.object({
  ...UserIdParamSchema,
  body: z.object({
    name: z.string({ required_error: "Nome obrigatório" }).nonempty(),
    login: z.string({ required_error: "Login obrigatório" }),
    password: z
      .string({ required_error: "Senha obrigatória" })
      .min(8)
      .optional(),
    user_level: z.nativeEnum(UserLevelEnum),
  }),
});

export const DeleteUserSchema = z.object(UserIdParamSchema);
