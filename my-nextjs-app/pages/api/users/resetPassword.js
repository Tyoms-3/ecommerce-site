import dbConnect from '../../../lib/dbConnect';
import User from '../../../lib/models/User';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email, token } = req.body;

    // Vérification du JWT (optionnel, si tu veux sécuriser cette opération)
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
      const resetPasswordExpire = Date.now() + 10 * 60 * 1000;

      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordExpire = resetPasswordExpire;
      await user.save();

      const resetUrl = `${process.env.NEXT_PUBLIC_API_URL}/reset-password/${resetToken}`;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        to: user.email,
        from: process.env.EMAIL_FROM,
        subject: 'Password reset token',
        html: `<p>You requested a password reset. Click the link below to reset your password:</p><p>${resetUrl}</p>`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Email sent' });
    } catch (error) {
      res.statu
