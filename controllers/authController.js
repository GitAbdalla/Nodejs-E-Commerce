const crypto = require("crypto");

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const ApiError = require("../utils/apiError");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const generateToken = require('../utils/generateToken')



// @desc Signup
// @route GET /api/v1/auth/signup
// @access Public
exports.signup = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = generateToken(user._id);

  res.status(201).json({ data: user, token });
});

// @desc login
// @route GET /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  const token = generateToken(user._id);

  res.status(200).json({ data: user, token });
});

// @desc make sure the user is logged in
exports.protect = asyncHandler(async (req, res, next) => {
  //1) check if token exists, if exist get
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new ApiError(
        "you are not login, please login to get access this route",
        401
      )
    );
  }
  //2) verify token (no change happens , expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  //3) check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "The user that belong to this token does no longer exist",
        401
      )
    );
  }
  //4) check if user changed his password after token created
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );

    //password changed after token created (Error)
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new ApiError(
          "User recently changed his password. please log in again",
          401
        )
      );
    }
  }
  req.user = currentUser;
  next();
});
// @desc Authorization (User Permissions)
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(" You are not allowed to access this route", 403)
      );
    }
    next();
  });

// @desc Forgot password
// @route POST /api/v1/auth/forgotPassword
// @access Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // 1) Get User by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with this email ${req.body.email}`, 404)
    );
  }
  // 2) If user exist, generate hash reset random 6 digits and save it in db
  const resetCode = Math.floor(
    Math.random() * (999999 - 100000 + 1) + 100000
  ).toString();
  const hashedResetCode = crypto
    .createHmac("sha256", process.env.JWT_SECRET_KEY)
    .update(resetCode)
    .digest("hex");
  // Save in db
  user.passwordResetCode = hashedResetCode;
  // add expiration time
  user.passwordResetExpires = Date.now() + 5 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save();

  const message = `Hi ${user.name}, \n we received a request to reset the password on your E-shop Account. \n
   ${resetCode} \n
   Enter this code to compelete the reset. \n
   Thanks for helping us keep your account secure \n
   E-shop Team 
   `;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset code(valid for 5 min)",
      message,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();
    return next(new ApiError("There is an error in sending email", 500));
  }

  res
    .status(200)
    .json({ status: "success", message: "reset code sent to email" });
});

// @desc Verify password reset code
// @route POST /api/v1/auth/verifyResetCode
// @access Public
exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  const hashedResetCode = crypto
    .createHmac("sha256", process.env.JWT_SECRET_KEY)
    .update(req.body.resetCode)
    .digest("hex");

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError("Reset code invalid or expired"));
  }
  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({ status: "success" });
});

// @desc Reset password
// @route POST /api/v1/auth/resetPassword
// @access Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with this email ${req.body.email}`)
    );
  }

  if (!user.passwordResetVerified) {
    return next(new ApiError("Reset code not verified", 400));
  }
  
  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  const token = generateToken(user._id);
  res.status(200).json({ token });
});
