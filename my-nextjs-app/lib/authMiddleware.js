// lib/authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (handler) => async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token not found or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attaches the decoded user to the request
    return handler(req, res); // Proceeds to the main handler
  } catch (error) {
    return res.status(403).json({ message: 'Unauthorized: Invalid token' });
  }
};

export default authMiddleware;
