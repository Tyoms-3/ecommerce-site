// lib/mongodb.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the MongoDB client
  // is not constantly being recreated during hot reloading
  if (global._mongoClientPromise) {
    clientPromise = global._mongoClientPromise;
  } else {
    clientPromise = client.connect();
    global._mongoClientPromise = clientPromise;
  }
} else {
  // In production mode, it's best to not use a global variable
  clientPromise = client.connect();
}

export default clientPromise;
