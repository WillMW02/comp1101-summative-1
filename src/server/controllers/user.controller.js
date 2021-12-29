/* eslint-disable no-unused-vars */

export default database => {
	const controller = {};

	/**
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 * @returns void
	 */
	controller.getUsers = (req, res) => {
		res.send('API is online');
	};

	/**
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 * @returns void
	 */
	controller.getUser = (req, res) => {
		res.send(`Test User ID ${req.params.id}`);
	};

	/**
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 * @returns void
	 */
	controller.createUser = (req, res) => {
		
	};

	/**
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 * @returns void
	 */
	controller.deleteUser = (req, res) => {

	};

	return controller;
};
