// src/users/dto/create-user.dto.ts
import { Prisma, RoleEnum } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

// Aqui pegamos o tipo "User" gerado pelo Prisma, mas omitimos campos automáticos
export class CreateUserDto implements Omit<Prisma.UserCreateInput, 'id' | 'createdAt' | 'updatedAt' | 'orders'> {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
