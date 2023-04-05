// Libraries
import express, { type Application } from 'express';
import cors from 'cors';

// Routes
import AuthRoute from '@routes/auth.route';
import dbConnection from '@config/dbConnection';

class Server {
	// Server
	public app: Application;
	private readonly port: string;

	// Routes
	private readonly authRoute = new AuthRoute();

	constructor() {
		this.app = express();
		this.port = process.env.PORT ?? '';

		this.middlewares();
		this.routes();
	}

	async runDataBase() {
		await dbConnection();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.static('public'));
	}

	routes() {
		this.authRoute.routes(this.app);
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server listening on port ${this.port} ✅`);
		});
		this.runDataBase();
	}
}

export default Server;
