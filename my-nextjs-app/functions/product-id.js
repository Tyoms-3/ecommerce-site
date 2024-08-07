const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI; // Assurez-vous que cette variable est définie dans vos environnements Netlify
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async (event) => {
  if (event.httpMethod === 'GET') {
    try {
      const { id } = event.queryStringParameters;

      // Validation de l'ID
      if (!id || typeof id !== 'string') {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Invalid ID' }),
        };
      }

      await client.connect();
      const db = client.db('ecommerce'); // Remplacez par le nom de votre base de données
      const collection = db.collection('products');

      // Requête pour trouver le produit par ID
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
