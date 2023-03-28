// Libraries
import dotenv from 'dotenv';

// Servers
import Server from '@servers/server';

dotenv.config();

const server = new Server();
server.listen();
