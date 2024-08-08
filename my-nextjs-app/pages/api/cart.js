// pages/api/cart.js
import clientPromise from '../../lib/mongodb'; // Assurez-vous que le chemin est correct
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('ecommerce');
  const collection = db.collection('cart');

  switch (req.method) {
    case 'GET':
      try {
        const items = await collection.find({}).toArray();
        return res.status(200).json(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    
    case 'POST':
      try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const result = await collection.insertOne({
          productId,
          quantity,
          createdAt: new Date(),
        });

        return res.status(201).json({ success: true, data: result.ops[0] });
      } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    
    case 'DELETE':
      try {
        const { id } = req.query;

        if (!id) {
          return res.status(400).json({ message: 'Missing ID' });
        }

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
          return res.status(200).json({ success: true, message: 'Item deleted' });
        } else {
          return res.status(404).json({ message: 'Item not found' });
        }
      } catch (error) {
        console.error('Error deleting item from cart:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    
    default:
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
