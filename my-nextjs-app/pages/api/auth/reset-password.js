import dbConnect from '../../../lib/dbConnect';
import User from '../../../lib/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();
  
  if (req.method === 'POST') {
    try {
      const { resetToken, newPassword } = req.body;

      const user = await User.findOne({ resetToken, resetTokenExpire: { $gt: Date.now() } });
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpire = undefined;
      await user.save();

      res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
