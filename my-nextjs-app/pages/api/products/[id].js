// pages/api/products/[id].js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid ID' });
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/.netlify/functions/product-id?id=${id}`);
      const product = await response.json();

      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
