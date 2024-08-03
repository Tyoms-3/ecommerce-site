// lib/products.js

// Exemple de données simulées
const products = {
  1: {
    id: 1,
    name: 'Sweat Personnalisé',
    image: '/image3-fond.jpg',
    colors: ['Rouge', 'Bleu', 'Vert'],
    embroideryOptions: [
      { type: 'double_broderie_grande_et_petite', label: 'Double broderie grande et petite (+€3.5)' },
      { type: 'double_broderie_grande', label: 'Double broderie grande (+€5.0)' },
      { type: 'double_broderie_petite', label: 'Double broderie petite (+€2.0)' },
    ],
    basePrice: 20.00
  },
  2: {
    id: 2,
    name: 'Pull Personnalisé',
    image: '/image2.jpg',
    colors: ['Rouge', 'Bleu', 'Vert'],
    embroideryOptions: [
      { type: 'double_broderie_grande_et_petite', label: 'Double broderie grande et petite (+€3.5)' },
      { type: 'double_broderie_grande', label: 'Double broderie grande (+€5.0)' },
      { type: 'double_broderie_petite', label: 'Double broderie petite (+€2.0)' },
    ],
    basePrice: 25.00
  }
};

export function getProductById(id) {
  return products[id] || null;
}

export function getAllProducts() {
  return Object.values(products);
}
