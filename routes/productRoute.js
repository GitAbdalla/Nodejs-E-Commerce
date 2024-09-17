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


const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductValidator, getProduct);
router.post("/", uploadProductImages ,resizeProductImages ,createProductValidator, createProduct);
router.put("/:id",uploadProductImages , resizeProductImages , updateProductValidator, updateProduct);
router.delete("/:id", deleteProductValidator, deleteProduct);

module.exports = router;
