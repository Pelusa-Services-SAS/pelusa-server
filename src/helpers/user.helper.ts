import UserModel from '@models/user.model';

export const existUsername = async (username: string) => {
	const usernameDB = await UserModel.findOne({ username, status: true });
	if (usernameDB != null) {
		throw new Error(`This username ${username} is already registered`);
	}
};

export const existEmail = async (email: string) => {
	const emailDB = await UserModel.findOne({ email, status: true });
	if (emailDB != null) {
		throw new Error(`This username ${email} is already registered`);
	}
};
