// pages/api/orders/index.js
import clientPromise from '../../lib/mongodb'; // Assurez-vous que le chemin est correct

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { customer, items, totalAmount } = req.body;

      if (!customer || !items || !totalAmount) {
        return res.status(400).json({ message: 'Bad Request: Missing required fields' });
      }

      const client = await clientPromise;
      const db = client.db('ecommerce'); // Remplacez par le nom de votre base de données
      const collection = db.collection('orders');

      // Enregistrez la commande dans la base de données
      const result = await collection.insertOne({ customer, items, totalAmount });

      res.status(201).json({ message: 'Order created successfully', order: result.ops[0] });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
