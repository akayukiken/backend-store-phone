const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  kondisi: {
    type: String,
    required: true,
  },
  ram: {
    type: String,
    required: true,
  },
  rom: {
    type: String,
    required: true,
  },
  warna: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  sales: {
    type: Number,
    required: true,
    default: 0,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
  },
});

module.exports = mongoose.model("Product", userSchema);
