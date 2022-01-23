import { getConn } from '../lib/mysql.js';
import SqlCommands from '../config/sqlCommands.config.json';
import logger from '../lib/logger.js';

/**
 * 
 * @param {string | number} id the ID of the review to be retrieved
 * 
 * @returns {string} JSON object containing the review.
 */
export const get = async id => {
	const conn = await getConn();
	try {
		const rows = await conn.query(SqlCommands.reviews.get, [id]);
		return rows[0];
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst fetching a review');
	}
};

/**
 * 
 * @returns 
 */
export const getAll = async () => {
	const conn = await getConn();
	try {
		const rows = await conn.query(SqlCommands.reviews.getAll);
		return rows;
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst fetching reviews');
	}
};

/**
 * 
 * @param {Object} review 
 */
export const create = async review => {
	const conn = await getConn();
	try {
		const rows = await conn.query(SqlCommands.reviews.create, [review.user_id, review.title, review.content, review.rating]);
		return rows[0];
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst creating a review');
	}
};

/**
 * 
 * @param {string | number} id the ID of the review to be deleted
 */
export const remove = async id => {
	const conn = await getConn();
	try {
		let rows = await conn.query(SqlCommands.reviews.exists, [id]);
		if(rows.length > 0) {
			rows = await conn.query(SqlCommands.reviews.delete, [id]);
			return true;
		} 
		return false;
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst deleting a review');
	}
};
