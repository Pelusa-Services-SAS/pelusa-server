import mongoose from 'mongoose';
/**
 * Database connection
 */

const dbConnection = async () => {
	try {
		const mongoUri = process.env.MONGO_URI ?? '';
		await mongoose.connect(mongoUri);
		console.log('Database Online! ✅');
	} catch (error) {
		console.log(error);
	}
};

/**
 * Database test disconnection
 */
export const dbDisconnect = async () => {
	await mongoose.disconnect();
};

export default dbConnection;
