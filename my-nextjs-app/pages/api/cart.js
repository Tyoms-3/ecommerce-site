// Exemple pour Next.js API Route
export default async function handler(req, res) {
  // Vous pouvez utiliser une base de données ou une autre méthode pour récupérer les éléments du panier
  // Exemple statique
  const cartItems = [
    { id: '1', name: 'Produit 1', price: 20 },
    { id: '2', name: 'Produit 2', price: 25 },
  ];

  res.status(200).json(cartItems);
}
