import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, {
    provide: 'APP_GUARD',
    useClass: RolesGuard,
  }],
  exports: [UsersService],
})
export class UsersModule { }
