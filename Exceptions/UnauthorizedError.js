import { HttpError } from './BaseException/HttpError.js';
export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}