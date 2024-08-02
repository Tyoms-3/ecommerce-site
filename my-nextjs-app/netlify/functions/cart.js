// netlify/functions/cart.js
const data = [
  { id: 1, name: 'Product 1', price: 20 },
  { id: 2, name: 'Product 2', price: 25 },
  // Ajoutez plus de produits selon vos besoins
];

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
