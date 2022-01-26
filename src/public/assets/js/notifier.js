export class Notifier {
	static #notification = `
		<div class="notification {{Notification_Type}}">
            <button class="delete"></button>
            {{Notification_Content}}
        </div>
	`;

	static notify = (type, message) => {
		const target = document.querySelector('#notif-container');

		let instance = this.#notification.replaceAll('{{Notification_Type}}', type);
		instance = instance.replaceAll('{{Notification_Content}}', message);
		
		target.innerHTML += instance;
		
		/**
		 * Add closing code to notification
		 * 
		 * The following code is taken from the link below
		 * 
		 * @author https://bulma.io/documentation/elements/notification/
		 */
		(document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
			const $notification = $delete.parentNode;
		
			$delete.addEventListener('click', () => {
				$notification.parentNode.removeChild($notification);
			});
		});
	};

	static error = message => {
		this.notify('is-danger', message);
	};

	static info = message => {
		this.notify('is-info', message);
	};

	static ok = message => {
		this.notify('is-success', message);
	};
}
