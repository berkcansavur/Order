const { validationResult } = require('express-validator');

/**
 * Middleware to validate request body based on the schema provided
 */
const validateRequest = (schema) => async (req, res, next) => {
  if (schema) {
    await schema.forEach((validation) => validation.validateAsync(req));
  }
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
};

module.exports = {
  validateRequest,
};
