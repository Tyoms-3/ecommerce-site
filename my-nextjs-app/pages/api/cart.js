// pages/api/cart.js
import clientPromise from '../../lib/mongodb'; // Assurez-vous que le chemin est correct
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('ecommerce');
  const collection = db.collection('cart');
  const productsCollection = db.collection('products');

  switch (req.method) {
    case 'GET':
      try {
        const items = await collection.find({}).toArray();
        return res.status(200).json(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

    case 'POST':
      try {
        const { productId, quantity, customizations } = req.body;

        if (!productId || !quantity || !customizations) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        // Récupération des détails du produit
        const product = await productsCollection.findOne({ _id: new ObjectId(productId) });

        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }

        // Calcul du prix de la personnalisation
        let customizationPrice = 0;
        if (customizations.embroidery === 'double_broderie_grande') {
          customizationPrice = 5.0;
        } else if (customizations.embroidery === 'double_broderie_grande_et_petite') {
          customizationPrice = 3.5;
        }

        // Calcul du prix total de l'article
        const totalItemPrice = (product.basePrice + customizationPrice) * quantity;

        // Insertion dans le panier
        const result = await collection.insertOne({
          productId: ObjectId(productId),
          quantity,
          productName: product.name,
          price: product.basePrice,
          customizations: {
            embroidery: customizations.embroidery,
            price: customizationPrice
          },
          totalItemPrice,
          createdAt: new Date(),
        });

        return res.status(201).json({ success: true, data: result.ops[0] });
      } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

    case 'DELETE':
      try {
        const { id } = req.query;

        if (!id) {
          return res.status(400).json({ message: 'Missing ID' });
        }

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
          return res.status(200).json({ success: true, message: 'Item deleted' });
        } else {
          return res.status(404).json({ message: 'Item not found' });
        }
      } catch (error) {
        console.error('Error deleting item from cart:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

    default:
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

