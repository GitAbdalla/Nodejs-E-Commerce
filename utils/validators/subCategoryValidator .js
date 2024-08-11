const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddlware");
const slugify = require("slugify");

exports.getSubSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  validatorMiddleware,
];
exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name")
    .custom((val, { req }) => {
      console.log("Custom Validator Value:", val); // Debug log
      req.body.slug = slugify(val);
      console.log("Slugified Value:", req.body.slug); // Debug log
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("subCategory must belong to category")
    .isMongoId()
    .withMessage("Invalid Category id format"),
  validatorMiddleware,
];
exports.updateSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("SubCategory required")
    .isMongoId()
    .withMessage("Invalid SubCategory id format"),
  validatorMiddleware,
];
exports.deleteSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("SubCategory required")
    .isMongoId()
    .withMessage("Invalid SubCategory id format"),
  validatorMiddleware,
];
