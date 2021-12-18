import express from 'express';
import { join, dirname} from 'path';
import { fileURLToPath } from 'url';
import logger from './lib/logger';

const app = express();
const __dirname = fileURLToPath(dirname(import.meta.url)); // workaround for ES6 not supporting __dirname for relative static folders 

app.use(express.static(join(__dirname, '../public')));

app.listen(process.env.PORT??80, () => {
	logger.info(`Listening on port ${process.env.PORT??80}`);
});
