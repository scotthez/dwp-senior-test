const BadRequestError = require('../../lib/errors/BadRequestError');
const Joi = require('joi');

const purchaseTicketRequestSchema = Joi.object({
  accountId: Joi.number().integer().min(1).required(),
  tickets: Joi.object().required().keys({
      adults: Joi.number().integer().min(0).required(),
      childrens: Joi.number().integer().min(0).optional(),
      infants: Joi.number().integer().min(0).optional(),    
  })
});

module.exports.validatePurchaseTicketInputs = (req, res, next) => {
  const validation = purchaseTicketRequestSchema.validate(req.body, { abortEarly: false, convert: false });
  if (validation.error) {
    return next(new BadRequestError("Validation Error", validation.error.message.replace(/['"]+/g, ''))); // Replacing "
  }
  return next();
};
