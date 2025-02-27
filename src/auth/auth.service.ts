import { Injectable, UnauthorizedException } from '@nestjs/common';
import { comparePassword } from 'src/utils/compare.utils';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) throw new UnauthorizedException();

    const isPasswordMatching = await comparePassword(pass, user.password);

    if (isPasswordMatching) throw new UnauthorizedException();

    const { password, ...result } = user;

    return password;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
