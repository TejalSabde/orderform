const mongoose = require('mongoose');

const productSchema = new  mongoose.Schema({
  "HSN/SAC": { type: Number, required: true },
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  categoryId: { type: Number, required: true },
  gst: { type: Number, required: true },
  minQty: { type: Number, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  returnQuantity: { type: Number, required: true },
  unit: { type: String, required: true },
});

const refundOrderSchema = new  mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true },
  status: { type: String },
  products: [productSchema],
  totalPrice: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// Create models
const Product = mongoose.model('Product', productSchema);
const RefundOrders = mongoose.model('RefundOrders', refundOrderSchema);

module.exports = RefundOrders 
