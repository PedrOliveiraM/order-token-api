import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const CreateUserSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email format" }),
  password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be at least 6 characters long" }),
  role: z.array(z.enum(["USER", "ADMIN", 'GUEST', 'EMPLOYEE'], { required_error: "Role is required" })),
})

export class CreateUserDto extends createZodDto(CreateUserSchema) { }