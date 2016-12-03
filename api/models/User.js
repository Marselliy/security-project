/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  hashAESKey: 'zYJFfxWwL)od=5)fG|9TP~&*>Fi(gEuD',

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
      delete obj.passwordHash;
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    }
  },
  beforeCreate: (values, cb) => {
    if (!values.password || values.password != values.passwordConfirmation) {
      return cb('Passwords don\'t match')
    }
    HashingService.hash(values.password, User.hashAESKey, hash => {
      delete values.password;
      delete values.passwordConfirmation;
      values.passwordHash = hash;
      cb();
    });
  }
};
