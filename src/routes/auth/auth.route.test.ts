// Libraries
import request, { type Response } from 'supertest';

// Utils
import { badLogin, userTest } from '@utils/test/auth.route.utils';

// Models
import UserModel from '@models/user.model';

// Server
import Server from '@servers/server';

const server = new Server();

describe('AuthRoute Test', () => {
	const { username, email, password } = userTest;

	describe('POST /api/auth/register', () => {
		let response: Response;
		let responseBad: Response;

		beforeAll(async () => {
			response = await request(server.app).post('/api/auth/register').send({ username, email, password });
			responseBad = await request(server.app).post('/api/auth/register').send({});
		});

		afterAll(async () => {
			await UserModel.deleteMany({ username });
		});

		test('should return a status 201 and return json', async () => {
			expect(response.statusCode).toBe(201);
			expect(response.headers['content-type']).toContain('json');
		});

		test('should must register the user ', async () => {
			expect(response.body._id).toBeDefined();
			expect(response.body.username).toBe(username);
		});

		test('should return a status 400 and an array errors ', () => {
			expect(responseBad.status).toBe(400);
			expect(responseBad.body.errors).toBeInstanceOf(Array);
		});
	});

	describe('POST /api/auth/register', () => {
		let response: Response;
		let responseBad: Response;
		let responseBadPassword: Response;

		beforeAll(async () => {
			await request(server.app).post('/api/auth/register').send({ username, email, password });
			response = await request(server.app).post('/api/auth/login').send({ email, password });
			responseBad = await request(server.app).post('/api/auth/login').send(badLogin);
			responseBadPassword = await request(server.app).post('/api/auth/login').send({ email, password: badLogin.password });
		});

		afterAll(async () => {
			await UserModel.deleteMany({ username: 'test user' });
		});

		test('should return a status 200 and return json', async () => {
			expect(response.statusCode).toBe(200);
			expect(response.headers['content-type']).toContain('json');
		});

		test('should must login the user ', async () => {
			expect(response.body.user._id).toBeDefined();
			expect(response.body.token).toBeDefined();
		});

		test('should return a status 401 and a error message when email fail ', () => {
			expect(responseBad.status).toBe(401);
			expect(responseBad.body.msg).toBe('Invalid credentials');
		});

		test('should return a status 401 and a error message when password fail ', () => {
			expect(responseBadPassword.status).toBe(401);
			expect(responseBadPassword.body.msg).toBe('Invalid credentials');
		});
	});
});
