/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new: (req, res, next) => {
		res.view();
	},

	create: (req, res, next) => {
		User.findOne({username: req.param('username')}, (err, user) => {
			if (err) return next(err);
			if (!user) return next('Something wrong');
			HashingService.verify(req.param('password'), user.passwordHash, User.hashAESKey, match => {
				if (match) {
					req.session.authenticated = true;
					return res.redirect('/message');
				}
				return res.redirect('/home');
			});
		});
	}
};
