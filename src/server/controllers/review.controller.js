/* eslint-disable no-unused-vars */
import * as ReviewModel from '../models/review.model.js';

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
export const createReview = (req, res) => {
	res.status(501);
	res.send();
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
		next(err);
		return;
	}
};
