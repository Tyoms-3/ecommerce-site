// pages/api/products/index.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/.netlify/functions/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const result = await response.json();
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/.netlify/functions/products`);
      const products = await response.json();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
