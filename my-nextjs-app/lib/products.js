// lib/products.js

// Simule des données de produits
const products = [
  { id: 1, name: 'Produit 1', description: 'Description du produit 1', price: 10, imageUrl: '/image1.jpg' },
  { id: 2, name: 'Produit 2', description: 'Description du produit 2', price: 20, imageUrl: '/image2.jpg' },
  { id: 3, name: 'Produit 3', description: 'Description du produit 3', price: 30, imageUrl: '/image3.jpg' },
];

// Retourne un produit basé sur son ID
export const getProductById = (id) => {
  return products.find((product) => product.id === parseInt(id, 10)); // Assure que l'ID est un nombre entier
};

// Retourne tous les produits
export const getAllProducts = () => {
  return products;
};
