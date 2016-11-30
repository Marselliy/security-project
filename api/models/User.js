/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    username: {
      type: 'string',
      required: true
    },

    passwordHash: {
      type: 'string'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj._csrf;
      delete obj.passwordConfirmation;
      delete obj.salt;
      delete obj.passwordHash;
      return obj;
    }
  },
  beforeCreate: (values, cb) => {
    if (!values.password || values.password != values.passwordConfirmation) {
      return cb('Passwords don\'t match')
    }
    HashingService.hash(values.password, (hash) => {
      delete values.password;
      delete values.passwordConfirmation;
      values.passwordHash = hash;
      cb();
    });
  }
};
