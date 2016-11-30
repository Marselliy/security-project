/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index : (req, res, next) => {
		User.find((err, users) => {
			if (err) return next(err);
			return next(users);
		});
	},

	new : (req, res, next) => {
		res.view();
	},

	create : (req, res, next) => {
		User.create(req.params.all(), (err, user) => {
			if (err) return next(err);
			if (!user) return next('Something wrong');
			res.redirect('/');
		});
	}
};
