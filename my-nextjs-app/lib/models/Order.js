// lib/models/Order.js
import mongoose from 'mongoose';
import dbConnect from '../dbConnect';

const { Schema } = mongoose;

const OrderSchema = new Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: String,
    sku: String,
    productRef: String,
    customizations: {
      embroideryOption: String,
    },
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  deliveryDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Connexion à la base de données 'orders'
const Order = (await dbConnect('orders')).model('Order', OrderSchema);

export default Order;

