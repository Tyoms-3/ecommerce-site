// pages/api/orders/index.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Vérifier que req.body contient les données nécessaires
      const { customer, items, totalAmount } = req.body;

      if (!customer || !items || !totalAmount) {
        return res.status(400).json({ message: 'Bad Request: Missing required fields' });
      }

      // Vous pouvez ajouter une logique pour enregistrer cette commande dans une base de données
      console.log('Order received:', req.body); // Debugging: Check the order data

      // Réponse succès
      res.status(201).json({ message: 'Order created successfully', order: req.body });
    } catch (error) {
      console.error('Error creating order:', error); // Log the error if something goes wrong
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
