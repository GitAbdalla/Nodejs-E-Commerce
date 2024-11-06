const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

exports.addProductToWishList = asyncHandler(async (req, res, next) => {
  // $addToSet => addProductId to wishList array if productId not exist
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
