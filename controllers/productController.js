const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncErrors = require("../middleware/asyncErrors");
const Features = require("../utils/features");

exports.createProduct = asyncErrors(async function (req, res, next) {
  const product = await Product.create(req.body);
  res.status(201).json({
    message: "Product created successfully",
    product,
  });
});

exports.getAllProducts = asyncErrors(async function (req, res) {
  const feature = new Features(Product.find(), req.query).search().filter();

  const products = await feature.query;
  res.status(200).json({
    message: "Products fetched successfully",
    products,
  });
});

exports.updateProduct = asyncErrors(async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    message: "Product updated successfully",
    product,
  });
});

exports.deleteProduct = asyncErrors(async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Product deleted successfully",
    product,
  });
});

exports.getProductdetails = asyncErrors(async function (req, res, next) {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    message: "Product fetched successfully",
    product,
  });
});
