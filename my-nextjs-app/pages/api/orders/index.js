// pages/api/orders/index.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const order = req.body; // Vous pouvez ajouter une logique pour enregistrer cette commande dans une base de données
      console.log('Order received:', order); // Debugging: Check the order data
      res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
      console.error('Error creating order:', error); // Log the error if something goes wrong
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
