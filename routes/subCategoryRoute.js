const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj,
} = require("../controllers/subCategoryController");
const {
  createSubCategoryValidator,
  getSubSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator ");

const authController = require("../controllers/authController");
// mergeparams :Allow us to access parametes on other routers
const router = express.Router({ mergeParams: true });

router.post(
  "/",
  authController.protect,
  authController.allowedTo("admin", "manager"),
  setCategoryIdToBody,
  createSubCategoryValidator,
  createSubCategory
);
router.get("/", createFilterObj, getSubCategories);
router.get("/:id", getSubSubCategoryValidator, getSubCategory);
router.put(
  "/:id",
  authController.protect,
  authController.allowedTo("admin", "manager"),
  updateSubCategoryValidator,
  updateSubCategory
);
router.delete(
  "/:id",
  authController.protect,
  authController.allowedTo("admin"),
  deleteSubCategoryValidator,
  deleteSubCategory
);
module.exports = router;
