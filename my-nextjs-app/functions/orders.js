//functions/orders.js
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

      console.log('Order received:', { customer, items, totalAmount });

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
