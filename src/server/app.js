import './config/env.config.js'; // workaround for ES imports being hoisted, to import the env file before other modules
import express from 'express';
import { join, dirname} from 'path';
import { fileURLToPath } from 'url';
import logger from './lib/logger.js';
import ApiRouter from './routes/api.route.js';

const app = express();
const __dirname = fileURLToPath(dirname(import.meta.url)); // workaround for ES6 not supporting __dirname for relative static folders 

app.use(express.static(join(__dirname, '../public')));

app.use('/api/', ApiRouter);

app.listen(process.env.PORT??8080, () => {
	logger.info(`Listening on port ${process.env.PORT??8080}`);
});

export default app;
