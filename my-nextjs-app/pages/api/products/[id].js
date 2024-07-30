// pages/api/products/[id].js
import { products } from '../../../data/products'; // Assurez-vous d'avoir un fichier `data/products.js`

export default function handler(req, res) {
  const { id } = req.query;
  const product = products.find((p) => p.id === parseInt(id, 10));

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
}
