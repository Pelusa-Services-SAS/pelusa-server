import express, { type Application } from 'express';
import cors from 'cors';

class Server {
	public app: Application;
	private readonly port: string;

	constructor() {
		this.app = express();
		this.port = process.env.PORT ?? '';

		this.middlewares();
	}

	middlewares(): void {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.static('public'));
	}

	listen(): void {
		this.app.listen(this.port, () => {
			console.log(`Server listening on port ${this.port} ✅`);
		});
	}
}

export default Server;
