const {StatusCodes} = require('http-status-codes');
const BadRequestError = require('../lib/errors/BadRequestError');
const InternalServerError = require('../lib/errors/InternalServerError');

module.exports = (app) => {
  app.use((err, req, res, next) => {
    if (err instanceof BadRequestError) {
      return res.status(err.statusCode).json(err.toJSON());
    }
    console.log(err);
    const error = new InternalServerError(err.message);
    return res.status(error.statusCode).json(error.toJSON());
  });

  app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ name: "NotFoundError", code: StatusCodes.NOT_FOUND, message: 'Page Not Found' });
  });
};