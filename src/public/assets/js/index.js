import { APIRequest } from './api.js';
import { Review } from './review.js';

let reviews = null;

/**
 * Initialises the website, including event listeners
 */
const pageInit = () => {
	loadReviews(true);

	const navBurger = document.querySelector('.navbar-burger');
	const navContent = document.querySelector('#navbar-content');

	navBurger.addEventListener('click', () => {
		navBurger.classList.toggle('is-active');
		navContent.classList.toggle('is-active');
	});
};

/**
 * Fetches all reviews from the database and populates `reviews` variable with the data.
 */
const fetchReviews = async () => {
	const req = new APIRequest('/review/');
	await req.get((res,err) => {
		if(err) return console.error(err);
		reviews = [];
		res.forEach(v => {
			reviews.push(new Review(v));
		});
	});
};

/**
 * Loads reviews and populates the page
 * @param {boolean} [force] Whether to force reload the reviews
 */
const loadReviews = async force => {
	if(force || !reviews) await fetchReviews();
	reviews.forEach(review => {
		console.log(review);
		document.querySelector('#reviews').innerHTML += review.generateElement();
	});
};

document.addEventListener('DOMContentLoaded', pageInit);
