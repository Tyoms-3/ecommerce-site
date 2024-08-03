// pages/api/product/[id].js
import { getProductById } from '../../../lib/products';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  console.log('Requested product ID:', id); // Affiche l'ID demandé

  const product = getProductById(id);

  if (product) {
    console.log('Product found:', product); // Affiche le produit trouvé
    res.status(200).json(product);
  } else {
    console.log('Product not found'); // Affiche si le produit n'est pas trouvé
    res.status(404).json({ message: 'Product not found' });
  }
}
