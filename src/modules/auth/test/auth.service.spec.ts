import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserResponseDto } from 'src/modules/users/dto/user-response.dto';
import { AuthService } from '../auth.service';
import { SignInResponseDto } from '../dto/signIn-response.dto';
import { SignInDto } from '../dto/signIn.dto';

describe('AuthService', () => {
  let service: AuthService;
  let hashService: { compare: jest.Mock };
  let jwtService: { signAsync: jest.Mock };

  const mockUser: UserResponseDto = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    roles: ['USER'],
    createdAt: new Date(),
    updatedAt: new Date(),
    password: 'hashedpassword',
  };

  const mockCredentials: SignInDto = {
    email: 'john@example.com',
    password: 'plainpassword',
  };

  const mockToken = 'mocked-jwt-token';

  const mockUserRepository = {
    findByEmail: jest.fn(),
  };

  const mockHashService = {
    compare: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'UserRepository', useValue: mockUserRepository },
        { provide: 'HashService', useValue: mockHashService },
        { provide: 'JwtService', useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    hashService = mockHashService;
    jwtService = mockJwtService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should sign in and return access token', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(mockUser);
    hashService.compare.mockResolvedValue(true);
    jwtService.signAsync.mockResolvedValue(mockToken);

    const result: SignInResponseDto = await service.signIn(mockCredentials);

    expect(result).toEqual({ access_token: mockToken });
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(mockCredentials.email);
    expect(hashService.compare).toHaveBeenCalledWith(mockCredentials.password, mockUser.password);
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: mockUser.id,
      email: mockUser.email,
      roles: mockUser.roles,
    });
  });

  it('should throw if user is not found', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    await expect(service.signIn(mockCredentials)).rejects.toThrow(UnauthorizedException);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(mockCredentials.email);
    expect(hashService.compare).not.toHaveBeenCalled();
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });

  it('should throw if password is invalid', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(mockUser);
    hashService.compare.mockResolvedValue(false);

    await expect(service.signIn(mockCredentials)).rejects.toThrow(UnauthorizedException);
    expect(hashService.compare).toHaveBeenCalledWith(mockCredentials.password, mockUser.password);
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });
});
