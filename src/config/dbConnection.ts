import mongoose, { type Mongoose } from 'mongoose';

/**
 * Database connection
 */

const dbConnection = async (): Promise<Mongoose> => {
	const mongoUri = process.env.MONGO_URI ?? '';
	return await mongoose.connect(mongoUri);
};

/**
 * Database test disconnection
 */
export const dbDisconnect = async () => {
	await mongoose.disconnect();
};

export default dbConnection;
