/**
 * MessageController
 *
 * @description :: Server-side logic for managing Messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: (req, res, next) => {
		Message.find((err, messages) => {
			if (err) return next('Something wrong with message db');
			res.view({messages: messages});
		});
	}
};
