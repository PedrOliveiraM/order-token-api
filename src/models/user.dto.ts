import { RoleEnum } from "src/constants/enum.constants";
import { z } from "zod";

export interface UserDto {
  id: string;
  name: string;
  email: string;
  password: string;
  role: typeof RoleEnum;
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