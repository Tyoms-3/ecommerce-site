// pages/api/products/[id].js

import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid ID' });
      }

      const client = await clientPromise;
      const db = client.db('yourDatabaseName'); // Remplacez par le nom de votre base de données
      const collection = db.collection('products');

      const product = await collection.findOne({ _id: new MongoClient.ObjectId(id) });

      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
