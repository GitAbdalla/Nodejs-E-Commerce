const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddlware");
const { default: slugify } = require("slugify");
const User = require("../../models/userModel")


exports.createUserValidator = [
    check("name")
      .notEmpty()
      .withMessage("User required")
      .isLength({ min: 3 })
      .withMessage("Too short User name")
      .custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
      }),
  
    check("email")
      .notEmpty()
      .withMessage("Email required")
      .isEmail()
      .withMessage("Invalid email address")
      .custom((val) =>
        User.findOne({ email: val }).then((user) => {
          if (user) {
            return Promise.reject(new Error("Email already in use"));
          }
        })
      ),
  
    check("password")
      .notEmpty()
      .withMessage("Password required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 charachters")
      .custom((password, {req})=>{
        if(password !== req.body.passwordConfirm){
            throw new Error('Password not identical')
        }
        return true
      }),


    check("passwordConfirm")
    .notEmpty()
    .withMessage('Password Confiramtion reqruired')  ,
  
    check("phone").optional().isMobilePhone(["ar-EG", "ar-SA"]).withMessage("Invalid phone number only accepts Egy and Ksa phone numbers"),
  
    check("profileImg").optional(),
  
    check("role").optional(),
  
    validatorMiddleware,
  ];
  
  exports.getUserValidator = [
    check("id").isMongoId().withMessage("Invalid User id format"),
    validatorMiddleware,
  ];
  
  exports.updateUserValidator = [
    check("id").isMongoId().withMessage("Invalid User id format"),
    body("name")
      .optional()
      .custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
      }),
    validatorMiddleware,
  ];
  exports.deleteUserValidator = [
    check("id").isMongoId().withMessage("Invalid User id format"),
    validatorMiddleware,
  ];