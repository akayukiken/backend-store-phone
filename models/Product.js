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
    type: Number,
    required: true,
  },
  rom: {
    type: Number,
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
  thumbnail: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
  },
});

module.exports = mongoose.model("Product", userSchema);
