const express = require("express");
const multer = require("multer");

const {
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createCategory,
  uploadCategoryImage,
  resizeImage,
} = require("../controllers/categoryController");
const {
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  createCategoryValidator,
} = require("../utils/validators/categoryValidator");

const authController = require("../controllers/authController");

const subCategoriesRoute = require("./subCategoryRoute");

const router = express.Router();

router.use("/:categoryId/subcategories", subCategoriesRoute);

router.get("/", getCategories);
router.get("/:id", getCategoryValidator, getCategory);
router.put(
  "/:id",
  authController.protect,
  authController.allowedTo("admin", "manager"),
  uploadCategoryImage,
  resizeImage,
  updateCategoryValidator,
  updateCategory
);
router.delete(
  "/:id",
  authController.protect,
  authController.allowedTo("admin"),
  deleteCategoryValidator,
  deleteCategory
);
router.post(
  "/",
  authController.protect,
  authController.allowedTo("admin", "manager"),
  uploadCategoryImage,
  resizeImage,
  createCategoryValidator,
  createCategory
);

module.exports = router;
