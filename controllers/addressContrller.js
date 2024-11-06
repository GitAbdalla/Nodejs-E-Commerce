const asyncHandler = require("express-async-handler");


const User = require("../models/userModel");

exports.addAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: req.body},
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Address was added successfully ",
    data: user.addresses,
  });
});

exports.deleteAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: {_id: req.params.addressId } },
    },
    { new: true }
  );
  
  res.status(200).json({
    status: "success",
    message: "Address was deleted successfully",
    data: user.addresses,
  });
});

exports.getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('addresses');
  res.status(200).json({
    status: "success",
    results: user.addresses.length,
    data: user.addresses,
  });
});
