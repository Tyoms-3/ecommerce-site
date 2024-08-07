const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // Assurez-vous que cette variable est définie dans vos environnements Netlify
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async (event) => {
  await client.connect();
  const db = client.db('ecommerce'); // Remplacez par le nom de votre base de données
  const collection = db.collection('products');

  if (event.httpMethod === 'POST') {
    try {
      const bodyObject = JSON.parse(event.body);
      const newProduct = await collection.insertOne(bodyObject);
      return {
        statusCode: 201,
        body: JSON.stringify(newProduct.ops[0]),
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
