const {check, body} = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddlware')
const Product = require('../../models/productModel')

exports.addProductToWishListValidator = [
    check("productId")
    .notEmpty()
    .withMessage("there is must be a product id")
    .isMongoId()
    .withMessage("Invalid ID format")
    .custom((productId) =>
      Product.findById(productId).then((product) => {
        if (!product) {
          return Promise.reject(
            new Error(`No product for this id: ${productId}`)
          );
        }
      })
    ),
    validatorMiddleware,
]