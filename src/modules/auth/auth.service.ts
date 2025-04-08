import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IEncrypter } from 'src/core/cryptography/interfaces/encrypter.interface';
import { UsersService } from './../users/users.service';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private encrypter: IEncrypter
  ) { }

  async signIn({ email, password }: SignInDto): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !user.password) {
      throw new NotFoundException("User not found");
    }

    const isPasswordValid = await this.encrypter.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, nme: user.name, email: user.email, roles: user.roles };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
