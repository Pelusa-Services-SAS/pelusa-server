// Libraries
import jwt from 'jsonwebtoken';

/**
 * This function generates a session token and returns it
 * @param { string } id - id user
 */
const generateJWT = async (id: string): Promise<string> => {
	const secretKey = process.env.SECRET_PRIVATE_KEY ?? 'test';
	const payload = { id };
	const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });

	return token;
};

export default generateJWT;
