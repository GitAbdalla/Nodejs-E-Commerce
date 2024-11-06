const express = require("express");

const authController = require("../controllers/authController");
const {
  addProductToWishList,
  deleteProductFromWishList,
  getLoggedUserWishList,
} = require("../controllers/wishListController");
const {
  addProductToWishListValidator,
} = require("../utils/validators/wishListValidator");

const router = express.Router();

router.use(authController.protect, authController.allowedTo("user"));

router.post("/", addProductToWishListValidator, addProductToWishList);

router.delete("/:productId", deleteProductFromWishList);

router.get("/", getLoggedUserWishList);

module.exports = router;
