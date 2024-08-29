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
// mergeparams :Allow us to access parametes on other routers
const router = express.Router({mergeParams: true});

router.post("/",setCategoryIdToBody ,createSubCategoryValidator, createSubCategory);
router.get("/", createFilterObj,getSubCategories);
router.get("/:id", getSubSubCategoryValidator, getSubCategory);
router.put("/:id", updateSubCategoryValidator, updateSubCategory);
router.delete("/:id", deleteSubCategoryValidator, deleteSubCategory);
module.exports = router;
