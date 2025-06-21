import z from "zod";

export const AuthSchema = z.object({
  body: z.object({
    login: z.string({ required_error: "Login obrigatório" }),
    password: z.string({ required_error: "Senha obrigatória." }),
  }),
});
