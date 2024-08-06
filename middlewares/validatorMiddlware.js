const { validationResult } = require("express-validator");

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Customize the errors to exclude the "type" field
    const customErrors = errors.array().map(error => ({
      value: error.value,
      msg: error.msg,
      path: error.param,
      location: error.location
    }));
    return res.status(400).json({ errors: customErrors });
  }
  next();
};

module.exports = validatorMiddleware;
