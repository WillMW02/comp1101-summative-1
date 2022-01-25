const api_endpoint_url = 'http://localhost/api';
/**
 * @class
 */
export class APIRequest {
	/**
	 * 
	 * @param {string} endpoint The endpoint to send the API request to, relative to API URL
	 * @param {Object} [body] The request body to be sent with your request
	 */
	constructor(endpoint, body) {
		this.endpoint = endpoint;
		this.body = body;
	}

	/**
	 * Request Callback
	 * @callback reqCallback
	 * @param {Object} res # Result from the HTTP Request parsed into an object
	 * @param {Error} err # 
	 */

	/**
	 * Send a get request to this.endpoint, and execute the callback with result and error as parameter 
	 * @param {reqCallback} callback 
	 */
	get = async callback => {
		try{
			const res = await fetch(`${api_endpoint_url}${this.endpoint}`, {
				method: 'GET'
			});
			if(!res.ok) throw new Error(`An error occured during GET to ${this.endpoint}`);

			const dat = JSON.parse(await res.text());
			callback(dat, null);
		} catch(err) {
			callback(null, err);
		}
	};

	/**
	 * Send a POST request to this.endpoint containing this.body, and execute the callback with result and error as parameter 
	 * @param {reqCallback} callback 
	 */
	post = async callback => {
		try{
			const res = await fetch(`${api_endpoint_url}${this.endpoint}`, {
				method: 'POST',
				body: JSON.stringify(this.body)
			});
			if(!res.ok) throw new Error(`An error occured during POST to ${this.endpoint}`);

			const dat = JSON.parse(await res.text());
			callback(dat, null);
		} catch(err) {
			callback(null, err);
		}
	};

	/**
	 * Send a DELETE request to this.endpoint, and execute the callback with result and error as parameter 
	 * @param {reqCallback} callback 
	 */
	delete = async callback => {
		try{
			const res = await fetch(`${api_endpoint_url}${this.endpoint}`, {
				method: 'DELETE'
			});
			if(!res.ok) throw new Error(`An error occured during DELETE to ${this.endpoint}`);

			const dat = JSON.parse(await res.text());
			callback(dat, null);
		} catch(err) {
			callback(null, err);
		}
	};
}