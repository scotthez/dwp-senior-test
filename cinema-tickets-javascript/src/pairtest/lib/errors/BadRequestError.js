
const {StatusCodes} = require('http-status-codes');

class BadRequestError extends Error {
  constructor(message = "Bad request", error = "Bad request") {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.error = error;
  }

  toJSON() {
    return {
      name: this.name,
      code: this.statusCode,
      message: this.message,
      error: this.error,
    };
  }
}
BadRequestError.prototype.name = 'BadRequestError';
module.exports = BadRequestError;
