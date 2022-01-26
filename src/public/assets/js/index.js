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

	Notifier.error('404, shit\'s broken yo');
	Notifier.info('INFORMATION');
	Notifier.ok('Ok boomer');
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
		document.querySelector('#reviews').innerHTML += review.generateElement();
	});
};

document.addEventListener('DOMContentLoaded', pageInit);
