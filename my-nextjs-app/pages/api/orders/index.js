// pages/api/orders/index.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const order = req.body; // Vous pouvez ajouter une logique pour enregistrer cette commande dans une base de données
    // Simulez la création d'une commande (à remplacer par une intégration réelle si nécessaire)
    res.status(201).json({ message: 'Order created successfully', order });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
