// pages/api/products/index.js
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db('ecommerce');

  switch (req.method) {
    case 'POST':
      let bodyObject = JSON.parse(req.body);
      let newProduct = await db.collection('products').insertOne(bodyObject);
      res.json(newProduct.ops[0]);
      break;
    case 'GET':
      const products = await db.collection('products').find({}).toArray();
      res.json({ status: 200, data: products });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};
