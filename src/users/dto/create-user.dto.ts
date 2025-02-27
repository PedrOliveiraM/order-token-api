import { RoleEnum } from '@prisma/client';
import { z } from 'zod';

// Criamos um schema Zod para o usuário
export const createUserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  role: z.nativeEnum(RoleEnum),
});

// Inferimos o tipo automaticamente a partir do schema
export type CreateUserDto = z.infer<typeof createUserSchema>;
