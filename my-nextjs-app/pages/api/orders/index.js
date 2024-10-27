// pages/api/orders/index.js
import dbConnect from '../../../lib/dbConnect';
import Order from '../../../lib/models/Order';
import { authMiddleware } from '../../../lib/authMiddleware';

async function handler(req, res) {
  await dbConnect();

  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  switch (req.method) {
    case 'GET':
      try {
        if (req.query.id) {
          const order = await Order.findById(req.query.id)
            .populate('customerId')
            .populate('items.productId')
            .exec();
          if (order) {
            return res.status(200).json(order);
          } else {
            return res.status(404).json({ message: 'Order not found' });
          }
        } else {
          const orders = await Order.find({})
            .populate('customerId')
            .populate('items.productId')
            .exec();
          return res.status(200).json(orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

    case 'POST':
      try {
        const { customerId, items, paymentMethod, shippingAddress, deliveryDate } = req.body;
        if (!customerId || !items || !paymentMethod || !shippingAddress || !deliveryDate) {
          return res.status(400).json({ message: 'Missing required fields' });
        }
        
        let totalAmount = 0;
        items.forEach(item => {
          let itemPrice = item.price;
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

        const newOrder = new Order({
          customerId,
          items,
          totalAmount,
          status: 'pending',
          paymentMethod,
          paymentStatus: 'pending',
          shippingAddress,
          deliveryDate,
        });

        const result = await newOrder.save();
        return res.status(201).json({ success: true, data: result });
      } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

    case 'PUT':
      try {
        const { id } = req.query;
        const { status, paymentMethod, shippingAddress, deliveryDate } = req.body;
        if (!id || !status) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const updateFields = { status, updatedAt: new Date() };
        if (paymentMethod) updateFields.paymentMethod = paymentMethod;
        if (shippingAddress) updateFields.shippingAddress = shippingAddress;
        if (deliveryDate) updateFields.deliveryDate = deliveryDate;

        const result = await Order.updateOne({ _id: id }, { $set: updateFields });

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

        const result = await Order.deleteOne({ _id: id });

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

export default authMiddleware(handler);
