// pages/api/products/index.js
import { getAllProducts } from '../../../lib/products';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const products = getAllProducts();
    res.status(200).json(products);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
