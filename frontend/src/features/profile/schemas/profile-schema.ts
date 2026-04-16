import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(100, "Maximo 100 caracteres"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
