import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '@prisma/client'; // Importando o enum RoleEnum
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João da Silva',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Função do usuário',
    enum: RoleEnum,
    example: 'ADMIN',
  })
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'joao@123456',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2025-02-28T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do usuário',
    example: '2025-02-28T00:00:00.000Z',
  })
  updatedAt: Date;
}
