import { RoleEnum } from "@prisma/client";
import { Role } from "src/enums/role.enum";
import { z } from "zod";

export interface UserDto {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().optional(),
  role: z.nativeEnum(RoleEnum).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})