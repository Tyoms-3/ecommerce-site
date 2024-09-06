import dbConnect from '../../../lib/dbConnect';
import Product from '../../../lib/models/Product';

export default async function handler(req, res) {
  await dbConnect(); // Connexion à la base de données

  if (req.method === 'POST') {
    try {
      const { name, image, basePrice, colors, embroideryOptions } = req.body;

      if (!name || !image || !basePrice || !colors || !embroideryOptions) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Création du produit avec Mongoose
      const newProduct = new Product({
        name,
        image,
        basePrice,
        colors,
        embroideryOptions,
      });

      // Sauvegarde dans la base de données
      const savedProduct = await newProduct.save();

      return res.status(201).json({ success: true, data: savedProduct });
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      // Récupération de tous les produits
      const products = await Product.find({});
      return res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
