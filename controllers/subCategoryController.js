const slugify = require("slugify");
const SubCategory = require("../models/subCategoryModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @desc Create subCategory
// @route POST /api/v1/subcategories
// @access Private
exports.createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: req.body.slug,
    category,
  });

  res.status(201).json({ data: subCategory });
});

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

// @desc Get list of  subCategory
// @route Get /api/v1/subcategories
// @access Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await SubCategory.find(req.filterObj)
    .skip(skip)
    .limit(limit);
  // .populate({ path: "category", select: "name -_id" });
  res
    .status(201)
    .json({ results: subCategories.length, page, data: subCategories });
});

// @desc Get Specific  subCategory
// @route Get /api/v1/subcategories/:id
// @access Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    return next(new ApiError(`No subcategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc Update Specific  subCategory
// @route Get /api/v1/subcategories/:id
// @access Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subCategory) {
    return next(new ApiError(`No subcategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc Delete Specific  subCategory
// @route Get /api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new ApiError(`No subcategory for this id ${id}`, 404));
  }
  res.status(204).send();
});
