import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IEncrypter } from "src/core/cryptography/interfaces/encrypter.interface";
import { PrismaService } from "src/infra/database/prisma.service";
import { userSelect } from "../constants/user.select";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserResponseDto } from "../dto/user-response.dto";
import { IUserRepository } from "../interfaces/user.repository";

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encrypter: IEncrypter,
  ) { }

  async create(user: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await this.encrypter.hash(user.password);

    try {
      const newUser = await this.prisma.users.create({
        data: {
          name: user.name,
          email: user.email.toLowerCase(),
          password: hashedPassword,
          role: user.role,
        },
        select: userSelect,
      });

      return newUser;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`Email "${user.email}" já está em uso`);
      }

      throw error;
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    return await this.prisma.users.findMany({
      select: userSelect,
      orderBy: { createdAt: 'asc' },
    });
  }

  async findByEmail(email: string): Promise<UserResponseDto | null> {
    return await this.prisma.users.findUnique({
      where: { email },
      select: { ...userSelect, password: true },
    });
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.users.findUnique({
      where: { id },
      select: userSelect,
    });

    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }

    return user;
  }

  async update(id: string, user: Partial<UpdateUserDto>): Promise<UserResponseDto> {
    try {
      return await this.prisma.users.update({
        where: { id },
        data: user,
        select: userSelect,
      });
    } catch (error: any) {
      if (error?.code === 'P2025') {
        throw new NotFoundException(`User with id "${id}" not found`);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.users.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error?.code === 'P2025') {
        throw new NotFoundException(`User with id "${id}" not found`);
      }
      throw error;
    }
  }

}
