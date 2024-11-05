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
    throw new Error(`Please define the ${dbName.toUpperCase()}_URI environment variable inside .env.local`);
  }
}

// Cache pour stocker les connexions
const cachedConnections = global.mongooseConnections || {};

global.mongooseConnections = cachedConnections;

async function dbConnect(dbName) {
  if (!cachedConnections[dbName]) {
    const dbURI = dbURIs[dbName];
    if (!dbURI) {
      throw new Error(`No URI found for the database: ${dbName}`);
    }

    cachedConnections[dbName] = mongoose.createConnection(dbURI, {
      bufferCommands: false,
    }).then((connection) => {
      console.log(`Connected to MongoDB database: ${dbName}`);
      return connection;
    }).catch(err => {
      console.error(`Error connecting to MongoDB database: ${dbName}`, err);
      throw err;
    });
  }
  return cachedConnections[dbName];
}

export default dbConnect;
