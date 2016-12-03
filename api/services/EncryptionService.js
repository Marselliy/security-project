var aesjs = require('aes-js');

module.exports = {
  aesEncryptString: (str, key, cb) => {
    var keytemp = aesjs.util.convertStringToBytes(key);
    var textBytes = aesjs.util.convertStringToBytes(str);
    var aesCtr = new aesjs.ModeOfOperation.ctr(keytemp);
    var encryptedBytes = aesCtr.encrypt(textBytes);
    cb(aesjs.util.convertBytesToString(encryptedBytes, 'hex'));
  },

  aesDecryptString: (str, key, cb) => {
    var keytemp = aesjs.util.convertStringToBytes(key);
    var textBytes = aesjs.util.convertStringToBytes(str, 'hex');
    var aesCtr = new aesjs.ModeOfOperation.ctr(keytemp);
    var decryptedBytes = aesCtr.decrypt(textBytes);
    cb(aesjs.util.convertBytesToString(decryptedBytes));
  }
}
