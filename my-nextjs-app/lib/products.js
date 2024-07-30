// lib/products.js

// Simule des données de produits
const products = [
  { id: 1, name: 'T-shirt Personnalisé', price: 20, imageUrl: '/image3-fond.jpg' },
  { id: 2, name: 'Sweat-shirt Personnalisé', price: 30, imageUrl: '/image3-fond.jpg' },
  // Ajoutez d'autres produits ici
];

export const getProductById = (id) => {
  return products.find((product) => product.id === parseInt(id, 10));
};

export const getAllProducts = () => {
  return products;
};
