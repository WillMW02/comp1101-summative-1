export class ElementBuilder {
	static #review = `
	<div class="card review">
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

	static #star = `
	<span class="icon star {{Active}}">
		<i class="fas fa-star"></i>
	</span>`;

	static buildReview = review => {
		let instance = this.#review;
		instance = instance.replaceAll('{{Review_Title}}', review.title);
		instance = instance.replaceAll('{{Review_Content}}', review.content);
		instance = instance.replaceAll('{{Review_Time}}', review.date);
		instance = instance.replaceAll('{{Author_Avatar}}', review.avatar);
		instance = instance.replaceAll('{{Author_Name}}', review.name);

		let stars = '';
		for(let i=0; i<5; i++) {
			console.log( i<review.rating?'active':'');
			stars += this.#star.replaceAll('{{Active}}', i<review.rating?'active':'');
		}

		instance = instance.replaceAll('{{Review_Stars}}', stars);

		return instance;
	};
}
