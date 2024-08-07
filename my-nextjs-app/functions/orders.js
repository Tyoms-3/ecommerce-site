//functions/orders.js
import clientPromise from '../lib/mongodb.js';

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    try {
      const { customer, items, totalAmount } = JSON.parse(event.body);

      if (!customer || !items || !totalAmount) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Bad Request: Missing required fields' }),
        };
      }

      const client = await clientPromise;
      const db = client.db('ecommerce');
      const collection = db.collection('orders');

      await collection.insertOne({ customer, items, totalAmount });

      return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Order created successfully', order: { customer, items, totalAmount } }),
      };
    } catch (error) {
      console.error('Error creating order:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: `Method ${event.httpMethod} Not Allowed`,
    };
  }
};
