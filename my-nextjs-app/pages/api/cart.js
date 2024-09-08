// pages/api/cart.js
import dbConnect from '../../lib/dbConnect';
import Product from '../../lib/models/Product';
import Cart from '../../lib/models/Cart';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  await dbConnect(); // Assurez-vous que la connexion est établie

  switch (req.method) {
    case 'GET':
      try {
        // Récupération de tous les items du panier
        const items = await Cart.find({});
        return res.status(200).json({ success: true, data: items });
      } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

    case 'POST':
      try {
        const { productId, quantity, customizations } = req.body;
        if (!productId || !quantity || !customizations) return res.status(400).json({ message: 'Missing required fields' });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        let customizationPrice = 0;
        if (customizations.embroidery === 'double_broderie_grande') customizationPrice = 5.0;
        if (customizations.embroidery === 'double_broderie_grande_et_petite') customizationPrice = 3.5;

        const totalItemPrice = (product.basePrice + customizationPrice) * quantity;
        
        const cartItem = new Cart({
          productId: ObjectId(productId),
          quantity,
          productName: product.name,
          price: product.basePrice,
          customizations: { embroidery: customizations.embroidery, price: customizationPrice },
          totalItemPrice,
        });

        const result = await cartItem.save();

        return res.status(201).json({ success: true, data: result });
      } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

    case 'DELETE':
      try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: 'Missing ID' });

        const result = await Cart.deleteOne({ _id: new ObjectId(id) });
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
