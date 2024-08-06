//functions/products.js
const { getAllProducts } = require('../../lib/products');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    try {
      const products = getAllProducts();
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
