import dbConnect from '../../../lib/dbConnect';
import User from '../../../lib/models/User';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  await dbConnect();
  
  if (req.method === 'POST') {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Generate a reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetToken = resetToken;
      user.resetTokenExpire = Date.now() + 3600000; // 1 hour
      await user.save();

      // Send email with reset token (This part should be configured with your email service)
      // For simplicity, the actual email sending code is omitted here.
      // You can use nodemailer or any other email service.

      res.status(200).json({ success: true, message: 'Reset token sent to email' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
