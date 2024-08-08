// pages/api/products/[id].js
import clientPromise from '../../../lib/mongodb'; // Assurez-vous que le chemin est correct
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid ID' });
      }

      const client = await clientPromise;
      const db = client.db('ecommerce');
      const collection = db.collection('products');

      const product = await collection.findOne({ _id: new ObjectId(id) });

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
