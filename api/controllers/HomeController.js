/**
 * HomeController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: (req, res, next) => {
		if (req.session.authenticated) {
			return res.redirect('/message')
		}
		res.view();
	}
};
