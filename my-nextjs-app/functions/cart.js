  // functions/cart.js

const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async (event, context) => {
  try {
    await client.connect();
    const db = client.db('ecommerce'); // Remplacez par le nom de votre base de données
    const collection = db.collection('cart');

    if (event.httpMethod === 'GET') {
      const cartItems = await collection.find({}).toArray();
      return {
        statusCode: 200,
        body: JSON.stringify(cartItems),
      };
    } else if (event.httpMethod === 'POST') {
      const item = JSON.parse(event.body);

      if (!item) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Bad Request: Missing item' }),
        };
      }

      await collection.insertOne(item);
      return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Item added to cart successfully' }),
      };
    } else {
      return {
        statusCode: 405,
        body: `Method ${event.httpMethod} Not Allowed`,
      };
    }
  } catch (error) {
    console.error('Error handling cart:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  } finally {
    await client.close();
  }
};
