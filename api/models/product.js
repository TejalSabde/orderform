const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    categoryId: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      HSN_SAC: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      minQty: {
        type: Number,
        required: true,
      },
      rate: {
        type: Number,
        required: true,
      },
      gst: {
        type: Number,
        required: true,
      }
})

const products = mongoose.model("products",productSchema);

module.exports = products;