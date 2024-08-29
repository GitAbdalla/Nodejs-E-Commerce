const Category = require("../models/categoryModel");
const factory = require('./handlersFactory')

// @desc Get list of categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = factory.getAll(Category)

// @desc Get specific category by id 
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategory = factory.getOne(Category)

// @desc Create category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = factory.createOne(Category)
// @desc Update category
// @route patch /api/v1/categories/:id
// @access Private

exports.updateCategory = factory.updateOne(Category)

// @desc Delete category
// @route DELETE /api/v1/categories/:id
// @access Private

exports.deleteCategory = factory.deleteOne(Category)
