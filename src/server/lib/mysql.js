import { createPool } from 'mariadb';

const conn_pool = createPool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	multipleStatements: true,
});

/**
 * Get a connection to the database from the connection pool.
 * @returns {Promise<PoolConnection>}
 */
export const getConn = () => {
	return conn_pool.getConnection();
};
