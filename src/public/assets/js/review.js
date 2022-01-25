import { ElementBuilder } from './elementBuilder.js';

export class Review {
	/**
	 * @param {Object} review
	 * @param {number} [review.id]
	 * @param {string} review.title 
	 * @param {string} review.content 
	 * @param {string} [review.date]
	 * @param {User} review.author 
	 */
	constructor(review) {
		for(let k in review) {
			this[k] = review[k];
		}
	}

	stringify = () => JSON.stringify(this);

	generateElement = () => ElementBuilder.buildReview(this);
}
