// lib/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dbConnect from '../dbConnect';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'],
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d+$/, 'Phone number must contain only digits.'],
  },
  password: { type: String, required: true, minlength: 6 },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Connexion au modèle 'User' via la base de données 'users'
async function getUserModel() {
  const userDb = await dbConnect('users');
  return userDb.model('User', userSchema);
}

export default getUserModel;
