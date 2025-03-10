import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email('O email deve ser um email válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type SignInDto = z.infer<typeof SignInSchema>;
