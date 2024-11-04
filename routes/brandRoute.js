const express = require("express");
const {
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
  createBrandValidator,
} = require("../utils/validators/brandValidator");
const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require("../controllers/brandController");

const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", getBrands);
router.get("/:id", getBrandValidator, getBrand);
router.post(
  "/",
  authController.protect,
  authController.allowedTo("admin", "manager"),
  uploadBrandImage,
  resizeImage,
  createBrandValidator,
  createBrand
);
router.put(
  "/:id",
  authController.protect,
  authController.allowedTo("admin", "manager"),
  uploadBrandImage,
  resizeImage,
  updateBrandValidator,
  updateBrand
);
router.delete(
  "/:id",
  authController.protect,
  authController.allowedTo("admin"),
  deleteBrandValidator,
  deleteBrand
);

module.exports = router;
