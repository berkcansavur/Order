const { validationResult } = require('express-validator');

/**
 * Middleware to validate request body based on the schema provided
 */
const validateRequest = (schema) => async (req, res, next) => {
  if(schema){
    await Promise.all(schema.map((validation) => validation.run(req)));
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
