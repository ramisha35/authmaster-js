import User from '../Models/User.Model.js';
import { ConflictError } from '../Exceptions/ConflictError.js';
import { NotFoundError } from '../Exceptions/NotFoundError.js';
import { UnauthorizedError } from '../Exceptions/UnauthorizedError.js';

export class AuthService {
    constructor(passwordHasher) {
      this.passwordHasher = passwordHasher;
    }
  
    async register({ name, surname, mail, password }) {
      const existing = await User.findOne({ mail });
      if (existing) throw new ConflictError('User already exists');
  
      const passwordHash = await this.passwordHasher.hash(password);
      const user = new User({ name, surname, mail, passwordHash });
      await user.save();
  
      return { id: user._id, mail: user.mail };
    }
  
    async login({ mail, password }) {
      const user = await User.findOne({ mail });
      if (!user) throw new NotFoundError('User not found');
  
      const isValid = await this.passwordHasher.verify(password, user.passwordHash);
      if (!isValid) throw new UnauthorizedError('Invalid credentials');
  
      return { id: user._id, mail: user.mail };
    }

   async getAll() {
    const users = await User.find();

   return users.map(user => ({
    id: user._id,
    name: user.name,
    surname: user.surname,
    mail: user.mail
  }));
}
}