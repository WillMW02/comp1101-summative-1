import { getConn } from '../lib/mysql.js';
import SqlCommands from '../config/sqlCommands.config.json' assert { type: 'json' };
import logger from '../lib/logger.js';

/**
 * Get a review by id
 * 
 * @param {string | number} id the ID of the review to be retrieved
 * 
 * @returns {Object} JSON object containing the review.
 */
export const get = async id => {
	const conn = await getConn();
	try {
		const rows = await conn.query(SqlCommands.reviews.get, [id]);
		return rows[0];
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst fetching a review');
	} finally {
		if (conn) conn.end();
	}
};

/**
 * Get all reviews in the database
 * 
 * @returns {Object[]} Array containing all reviews
 */
export const getAll = async () => {
	const conn = await getConn();
	try {
		const rows = await conn.query(SqlCommands.reviews.getAll);
		return rows;
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst fetching reviews');
	} finally {
		if (conn) conn.end();
	}
};

/**
 * Create a review from provided object
 * 
 * @param {Object} review
 * @param {string | number} review.user_id
 * @param {string} review.title
 * @param {string} review.content
 * @param {number} review.rating
 * 
 * @returns {Object} Object contining the ID of the created review 
 */
export const create = async review => {
	const conn = await getConn();
	try {
		let rows = await conn.query(SqlCommands.users.exists, [review.user_id]);
		if(rows.length > 0) {
			rows = await conn.query(SqlCommands.reviews.create, [review.user_id, review.title, review.content, review.rating]);
			return {
				id: rows[0].insertId
			};
		} return {
			err: 'No Such User'
		};
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst creating a review');
	} finally {
		if (conn) conn.end();
	}
};

/**
 * Delete a review from the database
 * 
 * @param {string | number} id the ID of the review to be deleted
 * 
 * @returns {boolean} Whether the deletion was successful
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
	} finally {
		if (conn) conn.end();
	}
};
