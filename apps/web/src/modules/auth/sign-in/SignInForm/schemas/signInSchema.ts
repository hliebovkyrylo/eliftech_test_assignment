import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignInInput = z.infer<typeof signInSchema>;
