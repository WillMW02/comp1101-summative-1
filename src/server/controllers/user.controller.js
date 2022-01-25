/* eslint-disable no-unused-vars */
import logger from '../lib/logger.js';
import * as UserModel from '../models/user.model.js';

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {function} next
 * @returns void
 */
export const getUsers = async (req, res, next) => {
	let dat;
	try {
		dat = await UserModel.getAll();
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
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {function} next
 * @returns void
 */
export const getUser = async (req, res, next) => {
	let dat;
	try {
		dat = await UserModel.get(req.params.id);
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
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {function} next
 * @returns void
 */
export const getUserByName = async (req, res, next) => {
	let dat;
	try {
		dat = await UserModel.getByName(req.params.name);
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
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {function} next
 * @returns void
 */
export const createUser = async (req, res, next) => {
	logger.info(`createUser Invoked with ${JSON.stringify(req.body)}`, true);

	if(!(req.body && req.body.name && req.body.avatar)) {
		res.status(406);
		return res.json({
			err: 'Request body did not include required parameters'
		});
	}
	let dat;
	try {
		dat = await UserModel.create(req.body);
		res.status(201);
		if(dat) {
			if(dat.err) {
				res.status(409);
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
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {function} next
 * @returns void
 */
export const setAvatar = async (req, res, next) => {
	logger.info(`setAvatar Invoked with ${JSON.stringify(req.body)}`, true);

	if(!(req.body && req.body.avatar)) {
		res.status(406);
		return res.json({
			err: 'Request body did not include required parameters'
		});
	}
	let dat;
	try {
		dat = await UserModel.setAvatar(req.params.id, req.body.avatar);
		res.status(202);
		if(!dat) {
			res.status(404);
			return res.send();
		}
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
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {function} next
 * @returns void
 */
export const deleteUser = async (req, res, next) => {
	try {
		if(await UserModel.remove(req.params.id)) {
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
