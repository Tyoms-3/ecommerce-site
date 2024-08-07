import clientPromise from '../lib/mongodb.js';

exports.handler = async (event) => {
  const client = await clientPromise;
  const db = client.db('ecommerce');
  const collection = db.collection('products');

  if (event.httpMethod === 'POST') {
    try {
      const bodyObject = JSON.parse(event.body);
      const result = await collection.insertOne(bodyObject);
      return {
        statusCode: 201,
        body: JSON.stringify(result.ops[0]),
      };
    } catch (error) {
      console.error('Error creating product:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' }),
      };
    }
  } else if (event.httpMethod === 'GET') {
    try {
      const products = await collection.find({}).toArray();
      return {
        statusCode: 200,
        body: JSON.stringify(products),
      };
    } catch (error) {
      console.error('Error fetching products:', error);
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
