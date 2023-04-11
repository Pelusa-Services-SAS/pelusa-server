// Libraries
import bcryptjs from 'bcryptjs';

// Interfaces
import type { IResponse } from '@interfaces/Api';
import type { ILoginUser, IRegisterUser } from '@interfaces/User';

// Models
import UserModel from '@models/user.model';

// Helpers
import generateJWT from '@helpers/jwt.helper';

class AuthServices {
	public registerService = async (body: IRegisterUser): Promise<IResponse> => {
		const { username, email, password } = body;
		const newUser = new UserModel({ username, email, password });
		await newUser.save();
		return { status: 201, data: newUser };
	};

	public loginService = async (body: ILoginUser): Promise<IResponse> => {
		const { email, password } = body;
		const user = await UserModel.findOne({ email, status: true });

		// Validate if the email exist
		if (user == null) {
			return { status: 401, data: { msg: 'Invalid credentials' } };
		}

		// Validate password
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return { status: 401, data: { msg: 'Invalid credentials' } };
		}

		// Generate JWT
		const token = await generateJWT(user.id);
		return { status: 200, data: { user, token } };
	};
}

export default AuthServices;
