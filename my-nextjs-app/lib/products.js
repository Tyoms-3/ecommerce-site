// lib/products.js

// Simule des données de produits
const products = [
  { id: 1, name: 'Sweat personnalisé', price: 20, imageUrl: '/image1.jpg' },
  { id: 2, name: 'Pull personnalisé', price: 30, imageUrl: '/image2.jpg' },
  { id: 3, name: 'Pyjama personnalisé', price: 25, imageUrl: '/image3.jpg' }
]

export const getProductById = (id) => {
  return products.find((product) => product.id === parseInt(id, 10));
}

export const getAllProducts = () => {
  return products;
}
