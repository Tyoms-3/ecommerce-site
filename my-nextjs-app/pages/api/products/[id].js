// pages/api/products/[id].js
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../lib/models/Product';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  await dbConnect(); // Assurez-vous que la connexion est établie

  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      if (!id || typeof id !== 'string') return res.status(400).json({ message: 'Invalid ID' });

      const product = await Product.findById(id);
      if (product) {
        return res.status(200).json(product);
      } else {
        return res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
