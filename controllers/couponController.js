const factory = require("./handlersFactory");
const Coupon = require("../models/couponModel");


// @desc Get list of Coupon
// @route GET /api/v1/coupon
// @access Private/Admin-Manager
exports.getCoupons = factory.getAll(Coupon);

// @desc Get specific coupon by id
// @route GET /api/v1/coupon/:id
// @access Private/Admin-Manager
exports.getCoupon = factory.getOne(Coupon);

// @desc Create coupon
// @route POST /api/v1/coupon
// @access Private/Admin-Manager
exports.createCoupon = factory.createOne(Coupon);

// @desc Update coupon
// @route patch /api/v1/coupon/:id
// @access Private/Admin-Manager
exports.updateCoupon = factory.updateOne(Coupon);

// @desc Delete coupon
// @route DELETE /api/v1/coupon/:id
// @access Private/Admin-Manager
exports.deleteCoupon = factory.deleteOne(Coupon);
