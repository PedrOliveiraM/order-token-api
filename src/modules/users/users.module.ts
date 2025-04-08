import { Module } from '@nestjs/common';
import { IEncrypter } from 'src/core/cryptography/interfaces/encrypter.interface';
import { BcryptEncrypter } from 'src/infra/cryptography/bcrypt.encrypter';
import { IUserRepository } from './interfaces/user.repository';
import { UserRepositoryImpl } from './repositories/user.repository.impl';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,
    {
      provide: IUserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: IEncrypter,
      useClass: BcryptEncrypter,
    }],
  exports: [UsersService, IEncrypter]
})
export class UsersModule { }
