import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { IEncrypter } from 'src/core/cryptography/interfaces/encrypter.interface';

@Injectable()
export class BcryptEncrypter implements IEncrypter {
  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}
