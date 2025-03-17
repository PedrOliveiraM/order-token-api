import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LogOutDto {
  @ApiProperty({ example: 'token', description: 'access token' })
  @IsString()
  token: string;
}
