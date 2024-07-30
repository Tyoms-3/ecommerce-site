// pages/api/products/[id].js

// Exemple de données statiques, remplacez par vos données réelles
const products = [
  { id: 1, name: 'Sweat Personnalisé', price: 20, imageUrl: '/image3-fond.jpg' },
  { id: 2, name: 'Pyjama Personnalisé', price: 25, imageUrl: '/image2.jpg' },
  // Ajoutez d'autres produits ici
];

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
