import { HttpError } from './BaseException/HttpError.js';
export class BadRequestError extends HttpError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}