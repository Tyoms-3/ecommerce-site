// pages/api/testConnection.js

import dbConnect from '../../lib/dbConnect';
import User from '../../lib/models/User'; // Assurez-vous d'importer un modèle existant

export default async function handler(req, res) {
  try {
    // Connexion à MongoDB
    await dbConnect();

    // Exécuter une opération simple, par exemple, compter le nombre d'utilisateurs
    const userCount = await User.countDocuments();

    res.status(200).json({ success: true, message: `La connexion est réussie. Nombre d'utilisateurs: ${userCount}` });
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    res.status(500).json({ success: false, message: 'Erreur de connexion à la base de données.' });
  }
}
