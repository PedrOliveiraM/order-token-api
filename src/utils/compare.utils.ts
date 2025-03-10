import * as bcrypt from 'bcryptjs';

console.log(bcrypt); // Adiciona isso temporariamente

export async function comparePassword(plainText: string, hashed: string): Promise<boolean> {
  return await bcrypt.compare(plainText, hashed);
}
