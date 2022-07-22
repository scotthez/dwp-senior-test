
const {StatusCodes} = require('http-status-codes');

class InternalServerError extends Error {
  constructor(message = "Internal Server Error") {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    this.error = "There was a problem with this service";
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
InternalServerError.prototype.name = 'InternalServerError';
module.exports = InternalServerError;
