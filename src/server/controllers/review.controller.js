/* eslint-disable no-unused-vars */
import * as ReviewModel from '../models/review.model.js';
import logger from '../lib/logger.js';

/**
 * @param {mysql.Connection} database
*/
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns void
 */
export const getReviews = async (req, res, next) => {
	let dat;
	try {
		dat = await ReviewModel.getAll();
		if(dat) res.json(dat);
		res.status(404);
		res.send();
	} catch(err) {
		res.status(500);
		res.send();
		next(err);
		return;
	}
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns void
 */
export const getReview = async (req, res, next) => {
	let dat;
	try {
		dat = await ReviewModel.get(req.params.id);
		if(dat) res.json(dat);
		res.status(404);
		res.send();
	} catch(err) {
		res.status(500);
		res.send();
		next(err);
		return;
	}
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns void
 */
export const createReview = async (req, res, next) => {
	logger.info(`createReview Invoked with ${JSON.stringify(req.body)}`, true);

	if(!(req.body && req.body.title && req.body.content && req.body.user_id && req.body.rating)) {
		res.status(406);
		return res.json({
			err: 'Request body did not include required parameters'
		});
	}
	let dat;
	try {
		dat = await ReviewModel.create(req.body);
		res.status(201);
		if(dat) {
			if(dat.err) {
				res.status(406);
			}
			return res.json(dat);
		}
		res.status(500);
		return res.send();
	} catch(err) {
		res.status(500);
		res.send();
		next(err);
		return;
	}
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns void
 */
export const deleteReview = async (req, res, next) => {
	try {
		if(await ReviewModel.remove(req.params.id)) {
			res.status(202);
		} else {
			res.status(404);
		}
		res.send();
	} catch(err) {
		res.status(500);
		res.send();
		next(err);
		return;
	}
};
