const BadRequestError = require('./BadRequestError');

class InvalidPurchaseException extends BadRequestError {
    constructor(message = "Invalid Purchase", error = "Invalid Purchase") {
        super(message, error);
        this.name = "InvalidPurchaseException";
    }
}

module.exports = InvalidPurchaseException; 