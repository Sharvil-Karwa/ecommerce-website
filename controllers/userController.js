const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModels");
const asyncErrors = require("../middleware/asyncErrors");
const sendToken = require("../utils/jwtToken");

// register

exports.register = asyncErrors(async function (req, res, next) {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "123",
      url: "123",
    },
  });

  sendToken(user, 201, res);
});

// login

exports.login = asyncErrors(async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide an email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }
  sendToken(user, 200, res);
});
