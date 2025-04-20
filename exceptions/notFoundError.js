import { httpError } from './baseException/httpError.js';
export class notFoundError extends httpError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}