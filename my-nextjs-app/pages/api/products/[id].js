// pages/api/products/[id].js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { id } = req.query;
  const filePath = path.join(process.cwd(), 'public/products.json');
  const jsonData = fs.readFileSync(filePath);
  const products = JSON.parse(jsonData);
  const product = products.find(product => product.id === id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
}
