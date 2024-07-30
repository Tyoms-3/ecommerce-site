// pages/api/products/index.js

// Exemple de données statiques, remplacez par vos données réelles
const products = [
  { id: 1, name: 'Sweat Personnalisé', price: 20, imageUrl: '/image3-fond.jpg' },
  { id: 2, name: 'Pyjama Personnalisé', price: 25, imageUrl: '/image2.jpg' },
  // Ajoutez d'autres produits ici
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Renvoyer la liste des produits
    res.status(200).json(products);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
