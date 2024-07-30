// pages/api/orders/index.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { productId, color, embroidery, price } = req.body;

    // Vous pouvez ici enregistrer la commande dans une base de données
    // Par exemple, vous pouvez utiliser une base de données NoSQL comme MongoDB

    // Réponse simulée
    res.status(201).json({ message: 'Order created successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
