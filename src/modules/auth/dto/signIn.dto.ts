import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string({message: "Email is required"}).email({message: "Invalid email format"}),
  password: z.string({message: "Password is required"}).min(6, {message: "Password must be at least 6 characters long"}),
})

export class SignInDto extends createZodDto(SignInSchema) {}