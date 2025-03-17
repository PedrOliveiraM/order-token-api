
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LogOutDto } from './dto/auth-logout-dto';
import { SignInDto } from './dto/auth-signIn-dto';
import { SignInResDto } from './dto/auth-signIn-res-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'User sign-in' })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() credentials: SignInDto): Promise<SignInResDto> {
    return this.authService.signIn(credentials);
  }

  @ApiOperation({ summary: 'User log-out' })
  @HttpCode(HttpStatus.OK)
  @Post('log-out')
  logOut(@Body() { token }: LogOutDto) {
    return this.authService.logOut(token);
  }
}
