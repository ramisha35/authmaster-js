export class httpError extends Error {
    constructor(message, status) {
      super(message);
      this.status = status;
    }
  }