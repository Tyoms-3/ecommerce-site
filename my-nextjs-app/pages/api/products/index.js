// pages/api/products/index.js
import { getAllProducts } from '../../../lib/products';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error); // Log the error if something goes wrong
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
