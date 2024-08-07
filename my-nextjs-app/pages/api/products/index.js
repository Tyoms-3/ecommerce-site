// pages/api/products/index.js
import clientPromise from '../../lib/mongodb'; // Assurez-vous que le chemin est correct

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('ecommerce'); // Remplacez par le nom de votre base de données
  const collection = db.collection('products');

  if (req.method === 'POST') {
    try {
      const bodyObject = JSON.parse(req.body);
      const newProduct = await collection.insertOne(bodyObject);
      res.status(201).json(newProduct.ops[0]);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const products = await collection.find({}).toArray();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
