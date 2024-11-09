const express = require("express");

const authController = require("../controllers/authController");
const { addProductToCart, getLoggedUserCart, deleteItemFromCart, clearCart } = require("../controllers/cartController");

const router = express.Router();

router.use(
  authController.protect,
  authController.allowedTo("user")
);

router.post("/", addProductToCart);
router.get("/", getLoggedUserCart);
router.delete("/:itemId", deleteItemFromCart);
router.delete("/", clearCart);


module.exports = router;