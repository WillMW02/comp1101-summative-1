import express from 'express';
import bodyParser from 'body-parser';
import { join, dirname} from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import logger from './lib/logger.js';
import ApiRouter from './routes/api.route.js';

const app = express();
const __dirname = fileURLToPath(dirname(import.meta.url)); // workaround for ES6 not supporting __dirname for relative static folders 

app.use(express.static(join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
	logger.info(`${req.method} request to ${req.path} from ${req.ip}`, true);
	res.setHeader('X-Powered-By', 'Magic and Pixie Dust');
	res.setHeader('X-Author', 'William Maltby-Wehner');
	next();
});

app.use('/api/', ApiRouter);

export default app;
