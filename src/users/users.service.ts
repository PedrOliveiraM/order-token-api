import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserDto } from './dto/user-dto';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<UserDto | null> {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
          role: createUserDto.role,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          orders: true,
          role: true,
          _count: true,
          password: false
        }
      });

      if (!newUser) return null;

      return newUser;

    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email já está em uso');
      }
      throw new InternalServerErrorException('Erro ao criar usuário');
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        orders: true,
        role: true,
        _count: true,
        password: false
      }
    })

    return { users }
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    })

    if (!user) return null

    return user;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })

    if (!user) return null

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user${JSON.stringify(updateUserDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
