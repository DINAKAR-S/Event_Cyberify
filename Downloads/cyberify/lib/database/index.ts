import mongoose from 'mongoose';

const MONGDB_URI = process.env.MONGDB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;
    if(!MONGDB_URI) throw new Error('MONODB_URI is missing');
    cached.promise = cached.promise || mongoose.connect(MONGDB_URI, {
        dbName: 'cyberify',
        bufferCommands: false,
    })
    cached.conn = await cached.promise;
    return cached.conn;

}