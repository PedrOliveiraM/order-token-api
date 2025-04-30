import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from './interfaces/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: IUserRepository
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findById(id: string) {
    return this.userRepository.findById(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }
}
