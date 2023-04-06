import { dbConnectionTest } from './src/config/dbTestConnection';
beforeAll(async () => {
	await dbConnectionTest();
});

afterAll(async () => {
	await dbConnectionTest();
});
