import { httpError } from './baseException/httpError.js';
export class conflictError extends httpError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}