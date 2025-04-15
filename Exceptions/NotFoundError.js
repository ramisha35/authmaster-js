import { HttpError } from './BaseException/HttpError.js';
export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}