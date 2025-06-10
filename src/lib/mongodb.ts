/**
 * @file src/lib/mongodb.ts
 * @description MongoDB connection utility with connection caching for Next.js applications.
 * This module provides a singleton database connection that is cached between hot reloads
 * in development and reused across requests in production.
 * 
 * @requires mongoose - MongoDB object modeling tool
 * @requires process.env.MONGODB_URI - MongoDB connection string, must be defined in .env.local
 * 
 * @author Cascade
 * @date 2025-06-08
 */

import mongoose, { Mongoose as MongooseClient } from 'mongoose';

/**
 * Interface defining the structure of the cached MongoDB connection object.
 * This is stored on the global object to persist between hot reloads in development.
 */
interface AppMongooseCache {
  /** The active MongoDB connection, or null if not connected */
  conn: MongooseClient | null;
  
  /** The promise that resolves to the MongoDB connection, or null if no connection is in progress */
  promise: Promise<MongooseClient> | null;
}

/**
 * Augment the globalThis type to include our custom 'mongoose_cache' property.
 * This allows TypeScript to recognize our cached connection object on the global scope.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose_cache: AppMongooseCache | undefined;
}

// Initialize or retrieve the cached connection object from the global scope
let cached: AppMongooseCache;
if (globalThis.mongoose_cache) {
  // Use existing cache if available
  cached = globalThis.mongoose_cache;
} else {
  // Initialize new cache if it doesn't exist
  cached = { conn: null, promise: null };
  globalThis.mongoose_cache = cached;
}

// Retrieve MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Throw an error if MONGODB_URI is not defined
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Establishes a connection to MongoDB using the connection string from environment variables.
 * Implements connection caching to reuse existing connections and prevent multiple connections.
 * 
 * @async
 * @function dbConnect
 * @returns {Promise<MongooseClient>} A promise that resolves to the MongoDB connection
 * @throws {Error} If MONGODB_URI is not defined or connection fails
 * 
 * @example
 * // Basic usage
 * const db = await dbConnect();
 * const result = await db.model('User').findOne();
 */
async function dbConnect(): Promise<MongooseClient> {
  // Double-check that MONGODB_URI is defined (TypeScript type guard)
  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  // Return cached connection if available
  if (cached.conn) {
    // In development, log when reusing a cached connection
    if (process.env.NODE_ENV === 'development') {
      console.log('MongoDB: Using cached connection.');
    }
    return cached.conn;
  }

  // Create a new connection promise if one doesn't exist
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering
    };

    // Initialize the connection
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Wait for the connection to be established
    cached.conn = await cached.promise;
    
    if (process.env.NODE_ENV === 'development') {
      console.log('MongoDB: New connection established.');
    }
  } catch (e) {
    // Reset the promise on error to allow retries
    cached.promise = null;
    console.error('MongoDB: Connection error:', e);
    throw e;
  }

  // This should ideally not be reached if the promise resolves/rejects correctly
  if (!cached.conn) {
    throw new Error('MongoDB connection failed and cached.conn is null.');
  }

  return cached.conn;
}

export default dbConnect;
