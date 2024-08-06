// pages/api/products/index.js
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('Project 0'); // Remplacez 'myDatabase' par le nom réel de votre base de données
      const collection = db.collection('products');

      const products = await collection.find({}).toArray();

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
