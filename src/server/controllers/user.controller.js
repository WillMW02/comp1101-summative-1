/* eslint-disable no-unused-vars */

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns void
 */
export const getUsers = (req, res) => {
	res.send('API is online');
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns void
 */
export const getUser = (req, res) => {
	res.send(`Test User ID ${req.params.id}`);
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns void
 */
export const createUser = (req, res) => {
	
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns void
 */
export const deleteUser = (req, res) => {

};
