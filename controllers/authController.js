const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const ApiError = require("../utils/apiError");
const User = require("../models/userModel");

const generateToken = (payload) => {
  return jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

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
  //3) check if user exists
  //4) check if user changed his password after token created
});
