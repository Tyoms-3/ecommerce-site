import crypto from 'crypto';
import { sendEmail } from '../../../lib/mail'; // Assure-toi que cette fonction existe et est correctement configurée
import User from '../../../lib/models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Générer un token de réinitialisation
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetToken = resetToken;
      user.resetTokenExpiration = Date.now() + 3600000; // 1 heure
      await user.save();

      // Envoyer l'email de réinitialisation
      const resetLink = `${process.env.NEXT_PUBLIC_API_URL}/reset-password?token=${resetToken}`;
      await sendEmail(user.email, 'Réinitialisation du mot de passe', `Cliquez sur le lien pour réinitialiser votre mot de passe : ${resetLink}`);

      return res.status(200).json({ message: 'Réinitialisation du mot de passe envoyée' });
    } catch (error) {
      console.error('Erreur lors de la demande de réinitialisation du mot de passe:', error);
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  } else {
    return res.status(405).json({ message: `Méthode ${req.method} non autorisée` });
  }
}
