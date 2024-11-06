const express = require("express");

const authController = require("../controllers/authController");
const { addProductToWishList } = require("../controllers/wishListController");
const {
  addProductToWishListValidator,
} = require("../utils/validators/wishListValidator");

const router = express.Router();

router.post(
  "/",
  authController.protect,
  authController.allowedTo("user"),
  addProductToWishListValidator,
  addProductToWishList
);
module.exports = router;
