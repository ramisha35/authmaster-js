import { httpError } from './baseException/httpError.js';
export class badRequestError extends httpError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}