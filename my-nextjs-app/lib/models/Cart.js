// lib/models/Cart.js

import mongoose from 'mongoose';
const { Schema } = mongoose;

const CartSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  customizations: {
    embroidery: { type: String, default: '' },
    price: { type: Number, default: 0 },
  },
  totalItemPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);