// pages/api/orders/index.js
import clientPromise from '../../../lib/mongodb'; 
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('ecommerce');
  const collection = db.collection('orders');

  switch (req.method) {
    case 'GET':
      try {
        const orders = await collection.find({}).toArray();
        return res.status(200).json(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    
    case 'POST':
      try {
        const { customerId, items } = req.body;

        if (!customerId || !items) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        // Calcul du montant total
        let totalAmount = 0;

        items.forEach(item => {
          let itemPrice = item.price;

          // Calcul du prix de la personnalisation
          if (item.customizations && item.customizations.embroideryOption) {
            if (item.customizations.embroideryOption === 'double_broderie_grande') {
              itemPrice += 5.00;
            } else if (item.customizations.embroideryOption === 'double_broderie_grande_et_petite') {
              itemPrice += 3.50;
            } else if (item.customizations.embroideryOption === 'double_broderie_petite') {
              itemPrice += 2.00;
            }
          }

          totalAmount += itemPrice * item.quantity;
        });

        const result = await collection.insertOne({
          customerId,
          items,
          totalAmount,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date()
        });

        return res.status(201).json({ success: true, data: result.ops[0] });
      } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    
    case 'PUT':
      try {
        const { id } = req.query;
        const { status } = req.body;

        if (!id || !status) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status, updatedAt: new Date() } }
        );

        if (result.matchedCount === 1) {
          return res.status(200).json({ success: true, message: 'Order updated' });
        } else {
          return res.status(404).json({ message: 'Order not found' });
        }
      } catch (error) {
        console.error('Error updating order:', error);
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
          return res.status(200).json({ success: true, message: 'Order deleted' });
        } else {
          return res.status(404).json({ message: 'Order not found' });
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    
    default:
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
