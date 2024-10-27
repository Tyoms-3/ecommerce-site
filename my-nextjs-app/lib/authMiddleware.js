// lib/authMiddleware.js
import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  // Récupère le token du header Authorization
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token not found or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Vérifie et décode le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajoute l'utilisateur décodé à la requête
    next(); // Passe à l'étape suivante
  } catch (error) {
    return res.status(403).json({ message: 'Unauthorized: Invalid token' });
  }
}
