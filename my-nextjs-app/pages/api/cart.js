// pages/api/cart.js
import clientPromise from '../../lib/mongodb.js';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('Project 0'); // Remplacez par le nom de votre base de données
    const collection = db.collection('cart');

    if (req.method === 'GET') {
      const cartItems = await collection.find({}).toArray();
      res.status(200).json(cartItems);
    } else if (req.method === 'POST') {
      const { item } = req.body;

      if (!item) {
        return res.status(400).json({ message: 'Bad Request: Missing item' });
      }

      await collection.insertOne(item);
      res.status(201).json({ message: 'Item added to cart successfully' });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
