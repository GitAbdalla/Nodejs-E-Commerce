const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const factory = require("./handlersFactory");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// @desc Create cash order
// @route POST /api/v1/order/cartId
// @access protected/user
exports.createCashOrder = asyncHandler(async (req, res, next) => {
  const taxPrice = 0;
  const shippingPrice = 0;
  // 1) Get cart depend on cartId
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(
      new ApiError(`There is no cart with this id: ${req.params.cartId}`)
    );
  }
  // 2) Get order price depend on cart price "Check if coupon apply"
  const cartPrice = cart.totalCartPriceAfterDiscount
    ? cart.totalCartPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;
  // 3) Create order with default paymentMethodType cash
  const order = await Order.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });

  // 4) After creating order, decrement product quantity, increment product sold
  if (order) {
    const bulkOption = cart.cartItems.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
        },
      };
    });

    await Product.bulkWrite(bulkOption, {});

    // 5) Clear cart depend on cartId
    await Cart.findByIdAndDelete(req.params.cartId);
  }

  res.status(201).json({ status: "success", data: order });
});

exports.filterOrderForLoggedUser = (req, res, next) => {
    if (req.user && req.user.role === 'user') {
      req.filterObj = { user: req.user._id };
    }
    next();
  };
// @desc Get all orders
// @route POST /api/v1/order
// @access protected/user/admin/manager
exports.findAllOrders = factory.getAll(Order);

// @desc Get all orders
// @route POST /api/v1/order
// @access protected/user/admin/manager
exports.findSpecificOrder = factory.getOne(Order)