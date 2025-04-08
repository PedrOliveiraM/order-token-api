import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { AuthService } from './auth.service';
import { SignInDto, SignInSchema } from './dto/signIn.dto';

const SignInDtoSwagger = zodToOpenAPI(SignInSchema);

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-in')
  @ApiBody({
    description: 'Sign in to the system',
    schema: SignInDtoSwagger,
  })
  @ApiResponse({ status: 201, description: 'Return access token' })
  @ApiResponse({ status: 401, description: 'Unauthorized, invalid password' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async signIn(@Body() signIn: SignInDto): Promise<any> {
    const token = await this.authService.signIn(signIn);
    return token
  }
}
