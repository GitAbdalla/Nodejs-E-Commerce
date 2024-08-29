const SubCategory = require("../models/subCategoryModel");
const factory = require('./handlersFactory')


exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

// @desc Get list of  subCategory
// @route Get /api/v1/subcategories
// @access Public
exports.getSubCategories = factory.getAll(SubCategory)

// @desc Get Specific  subCategory
// @route Get /api/v1/subcategories/:id
// @access Public
exports.getSubCategory = factory.getOne(SubCategory)

// @desc Create subCategory
// @route POST /api/v1/subcategories
// @access Private
exports.createSubCategory = factory.createOne(SubCategory)

// @desc Update Specific  subCategory
// @route Get /api/v1/subcategories/:id
// @access Private
exports.updateSubCategory = factory.updateOne(SubCategory)

// @desc Delete Specific  subCategory
// @route Get /api/v1/subcategories/:id
// @access Private

exports.deleteSubCategory = factory.deleteOne(SubCategory)
