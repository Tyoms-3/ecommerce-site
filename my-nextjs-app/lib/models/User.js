import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dbConnect from '../dbConnect';

// Définition du schéma de l'utilisateur
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

// Middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Connexion à la base de données
dbConnect();

// Exportation du modèle User
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export default UserModel;
