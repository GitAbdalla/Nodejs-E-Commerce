const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");


const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const Category = require("../models/categoryModel");


exports.uploadCategoryImage = uploadSingleImage('image');

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.webp`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("webp")
    .webp({ quality: 90 })
    .toFile(`uploads/categories/${filename}`);

  // save image to db
  req.body.image = filename;
  next();
});

// @desc Get list of categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = factory.getAll(Category);

// @desc Get specific category by id
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategory = factory.getOne(Category);

// @desc Create category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = factory.createOne(Category);
// @desc Update category
// @route patch /api/v1/categories/:id
// @access Private

exports.updateCategory = factory.updateOne(Category);

// @desc Delete category
// @route DELETE /api/v1/categories/:id
// @access Private

exports.deleteCategory = factory.deleteOne(Category);
