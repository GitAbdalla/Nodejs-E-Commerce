const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalCartPrice = totalPrice;
  return totalPrice;
};

// @desc Add product to cart
// @route POST /api/v1/cart
// @access Private
exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ApiError("Product not found", 404));
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [
        { product: productId, color, price: product.price, quantity: 1 },
      ],
    });
  } else {
    // Check if the product with the same color already exists in the cart
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );

    // If the product exists, increase its quantity
    if (productIndex > -1) {
      cart.cartItems[productIndex].quantity += 1;
    } else {
      // If the product does not exist in the cart, add it as a new item
      cart.cartItems.push({
        product: productId,
        color,
        price: product.price,
        quantity: 1,
      });
    }
  }

  calcTotalCartPrice(cart);
  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Product added to cart successfully",
    data: cart,
  });
});

// @desc Get logged user cart
// @route GET /api/v1/cart
// @access Private/User
exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(
      new ApiError(`There is no cart for this user id ${req.user._id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});
