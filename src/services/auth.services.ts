// Interfaces
import type { IResponse } from '@interfaces/Api';
import type { ILoginUser, IRegisterUser } from '@interfaces/User';

// Models
import UserModel from '@models/user.model';

class AuthServices {
	public registerService = async (body: IRegisterUser): Promise<IResponse> => {
		const { username, email, password } = body;
		const newUser = new UserModel({ username, email, password });
		await newUser.save();
		return { status: 201, data: newUser };
	};

	public loginService = async (body: ILoginUser): Promise<IResponse> => {
		const { email, password } = body;
		return { status: 200, data: { email, password } };
	};
}

export default AuthServices;
