// lib/dbConnect.js
import mongoose from 'mongoose';

const dbURIs = {
  users: process.env.MONGODB_URI_USERS,
  products: process.env.MONGODB_URI_PRODUCTS,
  orders: process.env.MONGODB_URI_ORDERS,
  carts: process.env.MONGODB_URI_CARTS,
};

// Vérification que chaque URI existe dans .env.local
for (const [dbName, uri] of Object.entries(dbURIs)) {
  if (!uri) {
    console.error(`Veuillez définir la variable d'environnement ${dbName.toUpperCase()}_URI dans .env.local`);
    throw new Error(`Missing environment variable for ${dbName.toUpperCase()} database URI.`);
  }
}

// Cache pour stocker les connexions
const cachedConnections = global.mongooseConnections || {};

global.mongooseConnections = cachedConnections;

async function dbConnect(dbName) {
  // Vérifie si la connexion pour cette base de données est déjà en cache
  if (!cachedConnections[dbName]) {
    const dbURI = dbURIs[dbName];

    try {
      // Utilise async/await pour gérer la promesse de connexion
      const connection = await mongoose.createConnection(dbURI, {
        bufferCommands: false,
      });
      cachedConnections[dbName] = connection;
      console.log(`Connecté à la base de données MongoDB : ${dbName}`);
    } catch (err) {
      console.error(`Erreur de connexion à la base de données MongoDB : ${dbName}`, err);
      throw new Error(`Unable to connect to database: ${dbName}`);
    }
  }

  // Retourne la connexion en cache
  return cachedConnections[dbName];
}

export default dbConnect;
