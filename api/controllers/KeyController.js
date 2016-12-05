/**
 * KeyController
 *
 * @description :: Server-side logic for managing Keys
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var keys = {}

module.exports = {
	enter: (req, res, next) => {
		Session.create({userid: req.session.userid}, (err, session) => {
			if (err) return next(err);
			res.ok({keys : keys});
		});
	},
	sendrsa: (req, res, next) => {
		for (var id in keys) {
			sails.sockets.broadcast(id, 'addnewkey', {id: sails.sockets.getId(req), key : req.params.all()});
		}
		keys[sails.sockets.getId(req)] = req.params.all();
	},
	leave: (req, res, next) => {
		Session.destroy({userid: req.session.userid}).exec(err => {
			if (err) return next(err);
			delete keys[sails.sockets.getId(req)];
			for (var id in keys) {
				sails.sockets.broadcast(id, 'removekey', {id: sails.sockets.getId(req)});
			}
		});
	},
	write: (req, res, next) => {
		messages = req.param('messages');
		User.findOne({id: req.session.userid}, (err, user) => {
			if (err) return next(err);
			for (var id in messages) {
				sails.sockets.broadcast(id, 'read', {author: user.username, message: messages[id]});
			}
		});
	}
};
