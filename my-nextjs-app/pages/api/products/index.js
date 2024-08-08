// pages/api/products/index.js
import clientPromise from '../../../lib/mongodb'; // Assurez-vous que le chemin est correct

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, image, basePrice, colors, embroideryOptions } = req.body;

      if (!name || !image || !basePrice || !colors || !embroideryOptions) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const client = await clientPromise;
      const db = client.db('ecommerce');
      const collection = db.collection('products');

      const result = await collection.insertOne({
        name,
        image,
        basePrice,
        colors,
        embroideryOptions,
      });

      return res.status(201).json({ success: true, data: result.ops[0] });
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
