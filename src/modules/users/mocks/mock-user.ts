import { faker } from '@faker-js/faker';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';

export const mockUser: UserResponseDto = {
  id: faker.number.bigInt({ min: 1000000n }).toString(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  roles: ['USER'],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockCreateUserDto: CreateUserDto = {
  name: mockUser.name,
  email: mockUser.email,
  password: mockUser.password!,
  roles: ['USER'],
};
