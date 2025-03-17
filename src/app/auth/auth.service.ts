import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/compare.utils';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/auth-signIn-dto';
import { SignInResDto } from './dto/auth-signIn-res-dto';

const blacklist = new Set<string>();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn({ email, password }: SignInDto): Promise<SignInResDto> {
    try {
      const user = await this.usersService.findUserByEmail(email);

      if (!user) throw new BadRequestException();

      const isPasswordMatching = await comparePassword(password, user.password);

      if (!isPasswordMatching) throw new UnauthorizedException("Invalid credentials");

      const payload = { sub: user.id, username: user.name, roles: user.role };
      console.log("payload: ", payload);
      const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });

      return { token: accessToken };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  logOut(token: string) {
    blacklist.add(token);
    return { message: 'User logged out successfully' };
  }

  isTokenBlacklisted(token: string): boolean {
    return blacklist.has(token);
  }
}