import dbConnect from '../../../lib/dbConnect';
import Product from '../../../lib/models/Product'; // Assurez-vous que ce chemin est correct

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { name, image, colors, embroideryOptions, basePrice } = req.body;

    if (!name || !image || !colors || !embroideryOptions || basePrice === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const product = await Product.create({
        name,
        image,
        colors,
        embroideryOptions,
        basePrice,
      });

      return res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
