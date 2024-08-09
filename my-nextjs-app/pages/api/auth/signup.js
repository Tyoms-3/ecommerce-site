import dbConnect from '../../../lib/dbConnect';
import User from '../../../lib/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { name, email, password, location } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
          return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
          name,
          email,
          password: hashedPassword,
          location,
        });

        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
