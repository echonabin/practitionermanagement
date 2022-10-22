import { ValidationError } from 'joi';
import { CustomError } from './custom-error';

// extending a regular Error class
export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError) {
    super('Invalid request parameters');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.details.map((err) => {
      return { message: err.message, field: err.context?.label };
    });
  }
}
