const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    maxLength: [8, "price cannot be more than 8 digits"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: [true, "please enter public_id"],
      },
      url: {
        type: String,
        required: [true, "please enter url"],
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please enter product category"],
  },
  Stock: {
    type: Number,
    required: [true, "please enter product stock"],
    maxLength: [3, "stock cannot be more than 3 digits"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: [true, "please enter name"],
      },
      rating: {
        type: Number,
        required: [true, "please enter rating"],
      },
      comment: {
        type: String,
        required: [true, "please enter comment"],
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
