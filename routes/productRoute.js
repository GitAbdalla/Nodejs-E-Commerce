const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  resizeProductImages,
  uploadProductImages,
} = require("../controllers/productController");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const reviewRoute = require('./reviewRoute')
const authController = require("../controllers/authController");

const router = express.Router();

// nested route
router.use("/:productId/reviews", reviewRoute);

router.get("/", getProducts);
router.get("/:id", getProductValidator, getProduct);
router.post(
  "/",
  authController.protect,
  authController.allowedTo("admin", "manager"),
  uploadProductImages,
  resizeProductImages,
  createProductValidator,
  createProduct
);
router.put(
  "/:id",
  authController.protect,
  authController.allowedTo("admin", "manager"),
  uploadProductImages,
  resizeProductImages,
  updateProductValidator,
  updateProduct
);
router.delete(
  "/:id",
  authController.protect,
  authController.allowedTo("admin"),
  deleteProductValidator,
  deleteProduct
);

module.exports = router;
