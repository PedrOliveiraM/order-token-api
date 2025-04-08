import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { RoleEnum } from 'src/core/constants/role.enum';
import { AuthGuard } from '../auth.guard';
import { RolesGuard } from '../roles.guard';
import { ROLES_KEY } from './roles.decorator';

export function Auth(...roles: RoleEnum[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}
