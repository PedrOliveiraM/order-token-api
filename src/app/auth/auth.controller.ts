
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LogOutDto } from './dto/auth-logout-dto';
import { SignInDto } from './dto/auth-signIn-dto';
import { SignInResDto } from './dto/auth-signIn-res-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User sign-in' })
  signIn(@Body() credentials: SignInDto): Promise<SignInResDto> {
    return this.authService.signIn(credentials);
  }

  @Post('log-out')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User log-out' })
  logOut(@Body() { token }: LogOutDto) {
    return this.authService.logOut(token);
  }
}
