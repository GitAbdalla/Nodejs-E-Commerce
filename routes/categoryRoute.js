const express = require("express");
const multer = require("multer");

const {
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createCategory,
  uploadCategoryImage,
  resizeImage
} = require("../controllers/categoryController");
const {
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  createCategoryValidator,
} = require("../utils/validators/categoryValidator");


const subCategoriesRoute = require("./subCategoryRoute");

const router = express.Router();

router.use("/:categoryId/subcategories", subCategoriesRoute);

router.get("/", getCategories);
router.get("/:id", getCategoryValidator, getCategory);
router.put("/:id", uploadCategoryImage, resizeImage , updateCategoryValidator, updateCategory);
router.delete("/:id", deleteCategoryValidator, deleteCategory);
router.post("/", uploadCategoryImage ,resizeImage , createCategoryValidator, createCategory);

module.exports = router;
