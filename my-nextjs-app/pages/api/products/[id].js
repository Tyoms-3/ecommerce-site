//pages/api/product/[id].js
import { getProductById } from '../../../lib/products';

export default function handler(req, res) {
  const { id } = req.query;
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
