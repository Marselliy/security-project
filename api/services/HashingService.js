var sha1 = require('sha1');
var argon2 = require('argon2');
const options = {
  timeCost: 4, memoryCost: 13, argon2d: true
};

module.exports = {
  hash: (pass, aesKey, cb) => {
    sha1Hash = sha1(pass);
  	argon2.generateSalt().then(salt => {
      argon2.hash(sha1Hash, salt, options).then(hash => {
        EncryptionService.aesEncryptString(hash, aesKey, encryptedHash => {
          cb(encryptedHash);
        });
      });
    });
  },

  verify: (pass, hash, aesKey, cb) => {
    sha1Hash = sha1(pass);
  	EncryptionService.aesDecryptString(hash, aesKey, decrHash => {
      argon2.verify(decrHash, sha1Hash).then(match => {
  		  cb(match);
  		}).catch(err => {
        cb(err);
  		});
    });
  }
}
