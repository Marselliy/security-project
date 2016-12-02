/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  hashAESKey: [0x3C73F98E,0x5531C415,0x39CD11A2,0xA6812C85,0x8827F24B,0x8DC72395,0x8C696EA6,0x44AB5CB5],

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
    HashingService.hash(values.password, hashAESKey, hash => {
      delete values.password;
      delete values.passwordConfirmation;
      values.passwordHash = hash;
      cb();
    });
  }
};
