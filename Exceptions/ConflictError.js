import { HttpError } from './BaseException/HttpError.js';
export class ConflictError extends HttpError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}