  // functions/cart.js

exports.handler = async (event, context) => {
  // Vous pouvez utiliser une base de données ou une autre méthode pour récupérer les éléments du panier
  // Exemple statique
  const cartItems = [
    { id: '1', name: 'Produit 1', price: 20 },
    { id: '2', name: 'Produit 2', price: 25 },
  ];

  return {
    statusCode: 200,
    body: JSON.stringify(cartItems),
  };
};
