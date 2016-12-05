module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  Session.findOne({userid: req.session.userid}, (err, user) => {
    if (user) {
      return res.forbidden('You are already here.');
    }
    return next();
  });
};
