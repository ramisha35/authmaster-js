import bcrypt from 'bcrypt';

export class BcryptPasswordHasher{
  async hash(password) {
    return bcrypt.hash(password, 10);
  }

  async verify(password, hash) {
    return bcrypt.compare(password, hash);
  }
}