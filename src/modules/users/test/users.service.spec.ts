import { Test, TestingModule } from '@nestjs/testing';
import { IUserRepository } from '../interfaces/user.repository';
import { mockCreateUserDto, mockUser } from '../mocks/mock-user';
import { UsersService } from '../users.service';


describe('UsersService', () => {
  let service: UsersService;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(async () => {
    mockUserRepository = {
      create: jest.fn().mockResolvedValue(mockUser),
      findAll: jest.fn().mockResolvedValue([mockUser]),
      findById: jest.fn().mockResolvedValue(mockUser),
      findByEmail: jest.fn().mockResolvedValue(mockUser),
      update: jest.fn().mockResolvedValue({ ...mockUser, name: 'Updated' }),
      delete: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const result = await service.create(mockCreateUserDto);
    expect(result).toEqual(mockUser);
    expect(mockUserRepository.create).toHaveBeenCalledWith(mockCreateUserDto);
  });

  it('should return all users', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockUser]);
    expect(mockUserRepository.findAll).toHaveBeenCalled();
  });

  it('should return a user by id', async () => {
    const result = await service.findById('any-id');
    expect(result).toEqual(mockUser);
    expect(mockUserRepository.findById).toHaveBeenCalledWith('any-id');
  });

  it('should update a user', async () => {
    const result = await service.update('1', { name: 'Updated' });
    expect(result).toEqual({ ...mockUser, name: 'Updated' });
    expect(mockUserRepository.update).toHaveBeenCalledWith('1', { name: 'Updated' });
  });

  it('should delete a user', async () => {
    const result = await service.delete('1');
    expect(result).toBeUndefined();
    expect(mockUserRepository.delete).toHaveBeenCalledWith('1');
  });

  // 👇 Testes de exceção

  it('should throw if user not found by ID', async () => {
    mockUserRepository.findById.mockRejectedValueOnce(new Error('User with id invalid-id not found'));
    await expect(service.findById('invalid-id')).rejects.toThrow('User with id invalid-id not found');
  });

  it('should throw if create fails', async () => {
    mockUserRepository.create.mockRejectedValueOnce(new Error('Database error'));
    await expect(service.create(mockCreateUserDto)).rejects.toThrow('Database error');
  });

  it('should throw if update fails', async () => {
    mockUserRepository.update.mockRejectedValueOnce(new Error('Update failed'));
    await expect(service.update('1', { name: 'New' })).rejects.toThrow('Update failed');
  });

  it('should throw if delete fails', async () => {
    mockUserRepository.delete.mockRejectedValueOnce(new Error('Delete failed'));
    await expect(service.delete('1')).rejects.toThrow('Delete failed');
  });
});
