import { getConn } from '../lib/mysql.js';
import SqlCommands from '../config/sqlCommands.config.json' assert { type: 'json' };
import logger from '../lib/logger.js';

/**
 * Get a user by id
 * 
 * @param {string | number} id the ID of the user to be retrieved
 * 
 * @returns {Object} Object containing the user.
 */
export const get = async id => {
	const conn = await getConn();
	try {
		const rows = await conn.query(SqlCommands.users.get, [id]);
		return rows[0];
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst fetching a user by id');
	} finally {
		if (conn) conn.end();
	}
};

/**
 * Get a user by the name column
 * 
 * @param {string} name
 * 
 * @returns {Object} Object containing the user.
 */
export const getByName = async name => {
	const conn = await getConn();
	try {
		const rows = await conn.query(SqlCommands.users.getByName, [name]);
		return rows[0];
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst fetching a user by username');
	} finally {
		if (conn) conn.end();
	}
};

/**
 * Get all users in the database
 * 
 * @returns {Object[]} Array containing all users
 */
export const getAll = async () => {
	const conn = await getConn();
	try {
		const rows = await conn.query(SqlCommands.users.getAll);
		return rows;
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst fetching users');
	} finally {
		if (conn) conn.end();
	}
};

/**
 * Create a users from provided object
 * 
 * @param {Object} user
 * @param {string} user.name
 * @param {string} user.avatar
 * 
 * @returns {Object} Object contining the ID of the created user 
 */
export const create = async user => {
	logger.info(`UserModel.create invoked with ${JSON.stringify(user)}`, true);
	const conn = await getConn();
	try {
		let rows = await conn.query(SqlCommands.users.existsByName, [user.name]);
		if(rows.length == 0) {
			rows = await conn.query(SqlCommands.users.create, [user.name, user.avatar]);
			return {
				id: rows[0].insertId
			};
		} return {
			err: 'User Already Exists'
		};
		
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst creating a user');
	} finally {
		if (conn) conn.end();
	}
};

/**
 * Sets the avatar of a user by identified by ID
 * @param {string | number} id 
 * @param {string} avatar 
 */
export const setAvatar = async (id, avatar) => {
	const conn = await getConn();
	try {
		let rows = await conn.query(SqlCommands.users.exists, [id]);
		if(rows.length > 0) {
			rows = await conn.query(SqlCommands.users.setAvatar, [avatar, id]);
			return true;
		} return false;
		
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst changing a user avatar');
	} finally {
		if (conn) conn.end();
	}
};

/**
 * Delete a user from the database
 * 
 * @param {string | number} id the ID of the user to be deleted
 * 
 * @returns {boolean} Whether the deletion was successful
 */
export const remove = async id => {
	const conn = await getConn();
	try {
		let rows = await conn.query(SqlCommands.users.exists, [id]);
		if(rows.length > 0) {
			rows = await conn.query(SqlCommands.users.delete, [id]);
			return true;
		} 
		return false;
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst deleting a user');
	} finally {
		if (conn) conn.end();
	}
};
