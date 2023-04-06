// Libraries
import type { Request, Response } from 'express';

// Services
import AuthServices from '@services/auth/auth.services';

class AuthController {
	private readonly authService: AuthServices;

	constructor() {
		this.authService = new AuthServices();
	}

	public registerController = async (req: Request, res: Response) => {
		try {
			const { status, data } = await this.authService.registerService(req.body);
			return res.status(status).send(data);
		} catch (error) {
			return res.status(500).send(error);
		}
	};

	public loginController = async (req: Request, res: Response) => {
		const { status, data } = await this.authService.loginService(req.body);
		return res.status(status).send(data);
	};
}

export default AuthController;
