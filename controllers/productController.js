const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");

const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");
const Product = require("../models/productModel");
const factory = require("./handlersFactory");

exports.uploadProductImages = uploadMixOfImages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);
exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.webp`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1400)
      .toFormat('webp')
      .webp({ quality: 90 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    req.body.imageCover = imageCoverFileName;
  }
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.webp`;

        await sharp(img.buffer)
          .resize(1000, 1000)
          .toFormat('webp')
          .webp({ quality: 90 })
          .toFile(`uploads/products/${imageName}`);

        req.body.images.push(imageName);
      })
    );
  }
  next()
});

// @desc Get list of products
// @route GET /api/v1/products
// @access Public
exports.getProducts = factory.getAll(Product, "Products");

// @desc Get specific product by id
// @route GET /api/v1/products/:id
// @access Public
exports.getProduct = factory.getOne(Product,'reviews');

// @desc Create product
// @route POST /api/v1/products
// @access Private
exports.createProduct = factory.createOne(Product);

// @desc Update product
// @route patch /api/v1/products/:id
// @access Private

exports.updateProduct = factory.updateOne(Product);

// @desc Delete product
// @route DELETE /api/v1/products/:id
// @access Private

exports.deleteProduct = factory.deleteOne(Product);
