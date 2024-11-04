const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const bcrypt = require('bcrypt')


const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const User = require("../models/userModel");
const ApiError = require("../utils/apiError");
const generateToken = require('../utils/generateToken')

exports.uploadUserImage = uploadSingleImage("profileImg");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.webp`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("webp")
      .webp({ quality: 90 })
      .toFile(`uploads/users/${filename}`);

    req.body.profileImg = filename;
  }
  next();
});

// @desc Get list of users
// @route GET /api/v1/users
// @access Private
exports.getusers = factory.getAll(User);

// @desc Get specific User by id
// @route GET /api/v1/users/:id
// @access Private
exports.getUser = factory.getOne(User);

// @desc Create User
// @route POST /api/v1/users
// @access Private
exports.createUser = factory.createOne(User);
// @desc Update User
// @route patch /api/v1/users/:id
// @access Private

exports.updateUser =asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
  req.params.id,
  {
    name: req.body.name,
    slug : req.body.slug,
    phone: req.body.phone,
    email: req.body.email,
    profileImg : req.body.profileImg,
    role : req.body.role
  },
  {
    new: true,
  }
);
  if (!document) {
    return next(new ApiError(`No document with this id: ${id}`, 404));
  }
  res.status(200).json({ data: document });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
  req.params.id,
  {
    password : await bcrypt.hash(req.body.password , 12),
    passwordChangedAt : Date.now(),
  },
  {
    new: true,
  }
);
  if (!document) {
    return next(new ApiError(`No document with this id: ${id}`, 404));
  }
  res.status(200).json({ data: document });
})

// @desc Delete User
// @route DELETE /api/v1/users/:id
// @access Private
exports.deleteUser = factory.deleteOne(User);

// @desc Get Logged user data
// @route DELETE /api/v1/users/getMe
// @access Private/protect
exports.getLoggedUserData = asyncHandler(async(req,res,next)=>{
  req.params.id = req.user._id
  next();
})

// @desc Update Logged user password
// @route DELETE /api/v1/users/updateMyPassword
// @access Private/protect
exports.updateLoggedUserPassword = asyncHandler(async(req,res,next)=>{
  //update user password based on user payload (req.user._id)
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password : await bcrypt.hash(req.body.password , 12),
      passwordChangedAt : Date.now(),
    },
    {
      new: true,
    }
  );
  const token = generateToken(user._id)
  res.status(200).json({data: user , token})
})

// @desc Update Logged user data
// @route DELETE /api/v1/users/updateMe
// @access Private/protect
exports.updateLoggedUserData = asyncHandler(async(req,res,next)=>{
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    {new : true}
  )
  
  res.status(200).json({data: updatedUser})
})

// @desc Deactivate Logged user 
// @route DELETE /api/v1/users/deleteMe
// @access Private/protect
exports.deleteLoggedUserData = asyncHandler(async(req,res,next)=>{
  await User.findByIdAndUpdate(req.user._id,{active: false})
  res.status(204).json({status: 'Success'})
})