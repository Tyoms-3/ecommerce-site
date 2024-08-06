//functions/product-id.js
const { getProductById } = require('../../lib/products');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const id = event.queryStringParameters.id;

  if (!id || typeof id !== 'string') {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid ID' }),
    };
  }

  console.log('Requested product ID:', id);

  const product = getProductById(id);

  if (product) {
    console.log('Product found:', product);
    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } else {
    console.log('Product not found');
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Product not found' }),
    };
  }
};
