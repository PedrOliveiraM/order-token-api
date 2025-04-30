import { Test, TestingModule } from '@nestjs/testing';
import { IEncrypter } from '../../../core/cryptography/interfaces/encrypter.interface';
import { BcryptEncrypter } from '../../../infra/cryptography/bcrypt.encrypter';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { SignInResponseDto } from '../dto/signIn-response.dto';
import { SignInDto } from '../dto/signIn.dto';
describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService,
        {
          provide: IEncrypter,
          useClass: BcryptEncrypter
        }
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe('SignIn', () => {
    it('should return an array of cats', async () => {

      const mockCredentials: SignInDto = {
        email: 'example@gmail.com',
        password: '123456'
      }

      const result: SignInResponseDto = {
        access_token: 'token_nestjs_auth'
      };

      jest.spyOn(service, 'signIn')
        .mockImplementation((credentials: SignInDto): Promise<SignInResponseDto> => {
          return Promise.resolve(result);
        });

      expect(await controller.signIn(mockCredentials)).toBe(result);
    });
  });

});
