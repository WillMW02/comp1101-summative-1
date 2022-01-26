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

	generateElement = () => {
		let instance = `
		<div class="card review" id="Review-{{Review_Id}}">
			<div class="card-content">
				<div class="content">
					<p class="title is-3">{{Review_Title}}</p>
					{{Review_Content}}
				</div>
				<div class="media is-left">
					<div class="media-left">
					<figure class="image is-48x48">
						<img src="{{Author_Avatar}}" alt="user avatar">
					</figure>
					</div>
					<div class="media-content">
						<p><span class="title is-5">{{Author_Name}}</span> <span class="subtitle is-7">{{Review_Time}}</span></p>
						<p class="subtitle is-6">
							{{Review_Stars}}
						</p>
					</div>
				</div>
			</div>
		</div>`;
		instance = instance.replaceAll('{{Review_Id}}', this.id);
		instance = instance.replaceAll('{{Review_Title}}', this.title);
		instance = instance.replaceAll('{{Review_Content}}', this.content);
		instance = instance.replaceAll('{{Review_Time}}', this.date);
		instance = instance.replaceAll('{{Author_Avatar}}', this.avatar);
		instance = instance.replaceAll('{{Author_Name}}', this.name);

		let stars = '';
		for(let i=0; i<5; i++) stars += `
			<span class="icon star {{Active}}">
				<i class="fas fa-star"></i>
			</span>`.replaceAll('{{Active}}', i<this.rating?'active':'');

		instance = instance.replaceAll('{{Review_Stars}}', stars);

		return instance;
	};
}
