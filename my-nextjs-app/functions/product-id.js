import clientPromise from '../lib/mongodb.js';
import { ObjectId } from 'mongodb';

exports.handler = async (event) => {
  if (event.httpMethod === 'GET') {
    try {
      const { id } = event.queryStringParameters;

      if (!id || typeof id !== 'string') {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Invalid ID' }),
        };
      }

      const client = await clientPromise;
      const db = client.db('ecommerce');
      const collection = db.collection('products');

      const product = await collection.findOne({ _id: new ObjectId(id) });

      if (product) {
        return {
          statusCode: 200,
          body: JSON.stringify(product),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Product not found' }),
        };
      }
    } catch (error) {
      console.error('Error fetching product:', error);
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
