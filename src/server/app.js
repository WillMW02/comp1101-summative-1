import './config/env.config.js'; // workaround for ES imports being hoisted, to import the env file before other modules
import express from 'express';
import { join, dirname} from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import mysql from 'mysql';
import logger from './lib/logger.js';
import ApiRouter from './routes/api.route.js';

const app = express();
const __dirname = fileURLToPath(dirname(import.meta.url)); // workaround for ES6 not supporting __dirname for relative static folders 

const database = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});

app.use(express.static(join(__dirname, '../public')));
app.use(cors());

app.use('/api/', ApiRouter(database));

app.listen(process.env.PORT??8080, () => {
	logger.info(`Listening on port ${process.env.PORT??8080}`);
});

export default app;
