const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  products: [
    {
      "HSN/SAC": { type: Number, required: true },
      categoryId: { type: Number, required: true },
      gst: { type: Number, required: true },
      minQty: { type: Number, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      rate: { type: Number, required: true },
      unit: { type: String, required: true }
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;