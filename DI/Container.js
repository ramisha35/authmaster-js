import { BcryptPasswordHasher } from '../Services/BcryptPasswordHasher.js';
import { AuthService } from '../Services/AuthService.js';

const passwordHasher = new BcryptPasswordHasher();
const authService = new AuthService(passwordHasher);

export const container = {
  passwordHasher,
  authService
};