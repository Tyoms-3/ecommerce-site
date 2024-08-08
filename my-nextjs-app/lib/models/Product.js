// lib/models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  basePrice: { type: Number, required: true },
  colors: { type: [String], required: true },
  embroideryOptions: [{
    type: { type: String, required: true },
    label: { type: String, required: true },
    additionalCost: { type: Number, required: true }
  }]
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
