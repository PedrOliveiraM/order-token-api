import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/app/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserDto } from './dto/user-dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.', type: UserDto })
  @ApiResponse({ status: 409, description: 'Email já está em uso.' })
  @ApiResponse({ status: 500, description: 'Erro ao criar usuário.' })
  @ApiBody({
    description: 'Informações necessárias para criar um usuário',
    type: CreateUserDto,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto | null> {
    if (!createUserDto) throw new BadRequestException('Dados inválidos');
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
