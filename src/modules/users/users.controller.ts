import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { RoleEnum } from 'src/core/constants/role.enum';
import { Auth } from 'src/core/guards/decorators/auth.decorator';
import { CreateUserDto, CreateUserSchema } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

const CreateUserDtoSwagger = zodToOpenAPI(CreateUserSchema);
const UpdateUserDtoSwagger = zodToOpenAPI(CreateUserSchema);

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({
    description: 'Create user DTO',
    schema: CreateUserDtoSwagger,
  })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 403, description: 'Forbidden: not authorized' })
  @ApiResponse({ status: 409, description: 'Conflict: email or username already exists' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @Auth(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({
    description: 'Update user DTO',
    schema: UpdateUserDtoSwagger,
  })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: not authorized' })
  @ApiResponse({ status: 409, description: 'Conflict: email or username already exists' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Auth(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
