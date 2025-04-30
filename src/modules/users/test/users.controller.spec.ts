import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser: UserResponseDto = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    roles: ['USER'],
    createdAt: new Date(),
    updatedAt: new Date(),
    password: 'hashedpassword',
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findById: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue({ ...mockUser, name: 'Updated' }),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = { name: 'John Doe', email: 'john@example.com', password: '123456', roles: ['USER'] };
    const result = await controller.create(dto);
    expect(result).toEqual(mockUser);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all users', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockUser]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a user by id', async () => {
    const result = await controller.findById('1');
    expect(result).toEqual(mockUser);
    expect(service.findById).toHaveBeenCalledWith('1');
  });

  it('should update a user', async () => {
    const result = await controller.update('1', { name: 'Updated' });
    expect(result).toEqual({ ...mockUser, name: 'Updated' });
    expect(service.update).toHaveBeenCalledWith('1', { name: 'Updated' });
  });

  it('should delete a user', async () => {
    await controller.remove('1');
    expect(service.delete).toHaveBeenCalledWith('1');
  });
});
