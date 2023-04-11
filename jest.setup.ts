import { dbConnectionTest, dbDisconnectTest } from './src/config/dbTestConnection';
beforeAll(async () => {
	await dbConnectionTest();
});

afterAll(async () => {
	await dbDisconnectTest();
});
