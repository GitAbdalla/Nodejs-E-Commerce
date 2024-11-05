const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddlware");
const Review = require("../../models/reviewModel");
exports.createReviewValidator = [
  check("title").optional(),
  check("ratings")
    .notEmpty()
    .withMessage("ratings value required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Ratings must be between 1 to 5"),
  check("user").isMongoId().withMessage("Invalid user id"),
  check("product")
    .isMongoId()
    .withMessage("Invalid product id")
    .custom(async (val, { req }) => {
      const review = await Review.findOne({
        user: req.user._id,
        product: req.body.product,
      });

      if (review) {
        throw new Error("You have already created a review for this product");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.getReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Review id format"),
  validatorMiddleware,
];
exports.updateReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Review id format").custom( async(val, {req})=>{
    const review = await Review.findById(val)
    if(!review){
      throw new Error(`There is no review with id ${val}`)
    }
    if(review.user.toString() !== req.user._id.toString()){
      throw new Error(`You are not allowed to perform this action`)
    }
    return true
  }),
  
  validatorMiddleware,
];
exports.deleteReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Review id format")
  .custom( async(val, {req})=>{
  
    if(req.user.role === 'user'){
      const review = await Review.findById(val)
      if(!review){
        throw new Error(`There is no review with id ${val}`)
      }
      if(review.user.toString() !== req.user._id.toString()){
        throw new Error(`You are not allowed to perform this action`)
      }
      return true
    }
  }),
  validatorMiddleware,
];
