import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "@prisma/client";
import { IsString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({
    description: 'ID do usuário',
    type: String,
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João da Silva',
  })
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'joao@123456',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Função do usuário',
    enum: RoleEnum,
    example: 'ADMIN',
  })
  role: RoleEnum;

  @ApiProperty({
    description: 'Data de criação do usuário',
    type: String,
    example: '2025-02-28T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do usuário',
    type: String,
    example: '2025-02-28T00:00:00.000Z',
  })
  updatedAt: Date;
}
