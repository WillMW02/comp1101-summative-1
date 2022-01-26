export class Notifier {
	static #notification = `
		<div class="notification {{Notification_Type}}">
            <button class="delete"></button>
            {{Notification_Content}}
        </div>
	`;

	/**
	 * Send a generic notification
	 * 
	 * @param {string} type the bulma "type" for the notification eg. is-success
	 * @param {string} message the message to send
	 */
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

	/**
	 * Send error notification
	 * 
	 * @param {string} message 
	 */
	static error = message => {
		this.notify('is-danger', message);
	};

	/**
	 * Send info notification
	 * 
	 * @param {string} message 
	 */
	static info = message => {
		this.notify('is-info', message);
	};

	/**
	 * Send succcess notification
	 * 
	 * @param {string} message 
	 */
	static ok = message => {
		this.notify('is-success', message);
	};
}
