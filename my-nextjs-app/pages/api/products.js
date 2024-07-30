// pages/api/products.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public/products.json');
  const jsonData = fs.readFileSync(filePath);
  const products = JSON.parse(jsonData);
  res.status(200).json(products);
}
