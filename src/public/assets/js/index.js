import { APIRequest } from './api.js';
import { Review } from './review.js';
import { Notifier } from './notifier.js';

let reviews = null;

/**
 * Initialises the website, including event listeners
 */
const pageInit = () => {
	loadReviews(true);

	modalInit();

	const navBurger = document.querySelector('.navbar-burger');
	const navContent = document.querySelector('#navbar-content');

	navBurger.addEventListener('click', () => {
		navBurger.classList.toggle('is-active');
		navContent.classList.toggle('is-active');
	});

	const createReviewForm = document.querySelector('#createReviewForm');
	createReviewForm.addEventListener('submit', e => {
		e.preventDefault();
		createReview(Object.fromEntries(new FormData(createReviewForm)));
	});

	const updateAvatarForm = document.querySelector('#updateAvatarForm');
	updateAvatarForm.addEventListener('submit', e => {
		e.preventDefault();
		updateAvatar(Object.fromEntries(new FormData(updateAvatarForm)));
	});
};

/**
 * Create a Review from form data
 * 
 * @param {Object} dat 
 * @returns void
 */
const createReview = dat => {
	if(dat && dat.review_title != '' && dat.review_content != '' && dat.review_rating != '' && dat.author_name != '') {
		const userExistsReq = new APIRequest(`/user/name/${dat.author_name}`);
		userExistsReq.get((res, err) => {
			/**
			 * 
			 */
			const createReview = (res, err) => {
				if(err) {
					Notifier.error('An error occured whilst creating a user, please try again later.');
					return console.error(err);
				}
				
				const createReviewReq = new APIRequest('/review', {
					user_id: res.id,
					title: dat.review_title,
					content: dat.review_content,
					rating: dat.review_rating
				});

				createReviewReq.post((res, err) => {
					if(err) {
						Notifier.error('An error occured whilst creating a review, please try again later.');
						return console.error(err);
					}

					loadReviews(true);
					return Notifier.ok('Created Review!');
				});
			};

			let createUserReq;
			if(err) {
				if(err.code != 404) {
					Notifier.error('An error occured whilst fetching a user, please try again later.');
					return console.error(err);
				}
				createUserReq = new APIRequest('/user', {
					name: dat.author_name,
					avatar: 'https://andrei.krokh.in/default.jpg'
				});
			}
			if(createUserReq) {
				createUserReq.post(createReview);
			} else createReview(res, null);
		});
	} else {
		return Notifier.error('Inputs for creating review were invalid.');
	}
};

/**
 * Update an avatar based on form inputs
 * 
 * @param {Object} dat
 */
const updateAvatar = dat => {
	if(!(dat && dat.user_name != '' && dat.user_avatar != '')) return Notifier.error('Inputs for changing avatar were invalid.');
	const userExistsReq = new APIRequest(`/user/name/${dat.user_name}`);
	userExistsReq.get((res, err) => {
		if(err) {
			if(err.code != 404) {
				Notifier.error('An error occured whilst fetching a user, please try again later.');
			} else Notifier.error('No user could be found matching the provided name.');
			return console.error(err);
		}
		const setAvatarReq = new APIRequest(`/user/${res.id}/avatar`, {
			avatar: dat.user_avatar
		});
		setAvatarReq.post((res, err) => {
			if(err) {
				Notifier.error('An error occured whilst changing a user\'s avatar, please try again later.');
				return console.error(err);
			}
			
			loadReviews(true);
			return Notifier.ok('Avatar Updated!');
		});
	});
};

/**
 * Modal JS Init
 * 
 * The following code is taken from the link below
 * 
 * @author https://bulma.io/documentation/components/modal/
 */
const modalInit = () => {
	
	/**
	 * Open a modal
	 * @param {element} $el 
	 */
	function openModal($el) {
		$el.classList.add('is-active');
	}
  
	/**
	 * Close a modal
	 * @param {element} $el 
	 */
	function closeModal($el) {
		$el.classList.remove('is-active');
	}
  
	// Add a click event on buttons to open a specific modal
	(document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
		const modal = $trigger.dataset.target;
		const $target = document.getElementById(modal);
  
		$trigger.addEventListener('click', () => {
			openModal($target);
		});
	});
  
	// Add a click event on various child elements to close the parent modal
	(document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete') || []).forEach(($close) => {
		const $target = $close.closest('.modal');

		$close.addEventListener('click', () => {
			closeModal($target);
		});
	});
};
  

/**
 * Fetches all reviews from the database and populates `reviews` variable with the data.
 */
const fetchReviews = async () => {
	const req = new APIRequest('/review/');
	await req.get((res,err) => {
		if(err) {
			Notifier.error('An error occured whilst fetching reviews, please try again later.');
			return console.error(err);
		}
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
	document.querySelector('#reviews').innerHTML = '';
	reviews.forEach(review => {
		document.querySelector('#reviews').innerHTML += review.generateElement();
	});
};

document.addEventListener('DOMContentLoaded', pageInit);
