import bcrypt from 'bcryptjs';
import User from '../../../lib/models/User'; // Assurez-vous que ce modèle existe

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token et nouveau mot de passe requis' });
    }

    try {
      const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });

      if (!user) {
        return res.status(400).json({ message: 'Token invalide ou expiré' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();

      return res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', error);
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  } else {
    return res.status(405).json({ message: `Méthode ${req.method} non autorisée` });
  }
}
