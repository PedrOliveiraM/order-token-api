import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInResDto {
  @ApiProperty({ example: 'strongpassword123', description: 'User password' })
  @IsString()
  token: string;
}
