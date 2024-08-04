const { validationResult } = require("express-validator");

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => {
      const { type, ...rest } = err; 
      return rest; 
    });
    return res.status(400).json({ errors: formattedErrors });
  }
  next();
};

module.exports = validatorMiddleware;
