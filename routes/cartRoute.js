const express = require("express");

const authController = require("../controllers/authController");
const { addProductToCart, getLoggedUserCart, deleteItemFromCart, clearCart, updateCartItemQuantity, applyCoupon } = require("../controllers/cartController");

const router = express.Router();

router.use(
  authController.protect,
  authController.allowedTo("user")
);

router.post("/", addProductToCart);
router.get("/", getLoggedUserCart);
router.delete("/:itemId", deleteItemFromCart);
router.delete("/", clearCart);
router.put("/applyCoupon", applyCoupon);
router.put("/:itemId", updateCartItemQuantity);


module.exports = router;
