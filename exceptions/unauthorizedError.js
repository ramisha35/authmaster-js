import { httpError } from './baseException/httpError.js';
export class unauthorizedError extends httpError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}