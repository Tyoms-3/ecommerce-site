// pages/api/products/index.js
import { products } from '../../../data/products'; // Assurez-vous d'avoir un fichier `data/products.js`

export default function handler(req, res) {
  res.status(200).json(products);
}
