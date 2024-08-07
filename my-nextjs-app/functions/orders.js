//functions/orders.js
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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

      await client.connect();
      const db = client.db('ecommerce'); // Remplacez par le nom de votre base de données
      const collection = db.collection('orders');

      // Enregistrez la commande dans la base de données
      const result = await collection.insertOne({ customer, items, totalAmount });

      return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Order created successfully', order: result.ops[0] }),
      };
    } catch (error) {
      console.error('Error creating order:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' }),
      };
    } finally {
      await client.close();
    }
  } else {
    return {
      statusCode: 405,
      body: `Method ${event.httpMethod} Not Allowed`,
    };
  }
};
