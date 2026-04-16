import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(1, "Password es requerido"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
