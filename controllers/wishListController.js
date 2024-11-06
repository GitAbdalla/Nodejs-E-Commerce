const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

exports.addProductToWishList = asyncHandler(async (req, res, next) => {
  // $addToSet => addProductId to wishList array if productId not
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: req.body.productId },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Product was added successfully to your wishList",
    data: user.wishList,
  });
});

exports.deleteProductFromWishList = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishList: req.params.productId },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Product was deleted successfully from your wishList",
    data: user.wishList,
  });
});

exports.getLoggedUserWishList = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('wishList');
  res.status(200).json({
    status: "success",
    results: user.wishList.length,
    data: user.wishList,
  });
});
