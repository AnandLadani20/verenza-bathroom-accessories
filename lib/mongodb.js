import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global._mongooseConn;
if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

export async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 5,
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
