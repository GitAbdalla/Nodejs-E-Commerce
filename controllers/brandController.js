const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");

const Brand = require("../models/brandModel ");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const factory = require("./handlersFactory");

exports.uploadBrandImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.webp`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("webp")
      .webp({ quality: 90 })
      .toFile(`uploads/brands/${filename}`);

    // save image to db
    req.body.image = filename;
  }

  next();
});
// @desc Get list of brands
// @route GET /api/v1/brands
// @access Public
exports.getBrands = factory.getAll(Brand);

// @desc Get specific brand by id
// @route GET /api/v1/brands/:id
// @access Public
exports.getBrand = factory.getOne(Brand);

// @desc Create brand
// @route POST /api/v1/brands
// @access Private
exports.createBrand = factory.createOne(Brand);
// @desc Update brand
// @route patch /api/v1/brands/:id
// @access Private

exports.updateBrand = factory.updateOne(Brand);

// @desc Delete brand
// @route DELETE /api/v1/brands/:id
// @access Private

exports.deleteBrand = factory.deleteOne(Brand);
