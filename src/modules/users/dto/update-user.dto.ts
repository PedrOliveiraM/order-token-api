import { PartialType } from '@nestjs/mapped-types';
import { createZodDto } from 'nestjs-zod';
import { CreateUserSchema } from './create-user.dto';

export class UpdateUserDto extends PartialType(createZodDto(CreateUserSchema)) { }