// pages/api/products/[id].js

import clientPromise from '../../../lib/mongodb'; // Assurez-vous que ce fichier est correctement configuré
import { ObjectId } from 'mongodb'; // Importez ObjectId depuis 'mongodb' A VERIFIER 

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;

      // Validation de l'ID
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid ID' });
      }

      const client = await clientPromise;
      const db = client.db('Project 0'); // Remplacez par le nom de votre base de données
      const collection = db.collection('products');

      // Requête pour trouver le produit par ID
      const product = await collection.findOne({ _id: new ObjectId(id) });

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
