const slugify = require("slugify");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// @desc Get list of products
// @route GET /api/v1/products
// @access Public
exports.getProducts = asyncHandler(async (req, res) => {

  // 1) Filtering
  const queryStringObj = { ...req.query };
  const excludesFields = ["page", "sort", "limit", "fields"];
  excludesFields.forEach((field) => delete queryStringObj[field]);

  // Apply filteration using[ gte , gt , lte , lt]
  let queryStr = JSON.stringify(queryStringObj)
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

  // 2) pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  //  Build query
  let mongooseQuery = Product.find(JSON.parse(queryStr))
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });

  // 3) Sorting
  if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ')
    mongooseQuery = mongooseQuery.sort(sortBy)
  }else {
    mongooseQuery = mongooseQuery.sort("-createAt")
  }

  //  Execute query
  const products = await mongooseQuery;

  res.status(200).json({ results: products.length, page, data: products });
});

// @desc Get specific product by id
// @route GET /api/v1/products/:id
// @access Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!product) {
    return next(new ApiError(`No product with this id: ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc Create product
// @route POST /api/v1/products
// @access Private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @desc Update product
// @route patch /api/v1/products/:id
// @access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`No product with this id: ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc Delete product
// @route DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(`No product with this id: ${id}`, 404));
  }
  res.status(204).json();
});
