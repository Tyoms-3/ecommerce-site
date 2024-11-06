// pages/api/users/register.js
import getUserModel from '../../../lib/models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const User = await getUserModel();

  if (req.method === 'POST') {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      });

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '30d', algorithm: 'HS256' }
      );

      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          token,
        },
      });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
