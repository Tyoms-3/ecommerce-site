// pages/api/products/[id].js
import { getProductById } from '../../../lib/products';

export default function handler(req, res) {
  const { id } = req.query;

  // Assurez-vous que l'ID est bien un nombre
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  console.log('Requested product ID:', id); // Debugging: Check the requested ID

  const product = getProductById(id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
}
