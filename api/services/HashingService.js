var sha1 = require('sha1');
var argon2 = require('argon2');
var AES = require('aes');
var aeskey = [0xffffffff,0xffffffff,0xffffffff,0xffffffff,0xffffffff,0xfffffff8];
const options = {
  timeCost: 4, memoryCost: 13, argon2d: true
};

module.exports = {
  hash: (pass, cb) => {
    sha1Hash = sha1(pass);
  	argon2.generateSalt().then(salt => {
    argon2.hash(sha1Hash, salt, options).then(hash => {
  	var aes = new AES(aeskey);
  	hashParts = hash.match(/[^]{1,4}/g);
  	for (var key = 0; key < 4 - hashParts[hashParts.length - 1].length; key++) {
  		hashParts[hashParts.length - 1] += '$';
  	}
  	hashPartsUint = hashParts.map(part => Uint32Array.from(part.split('').map(ch => ch.charCodeAt(0))));
  	hashPartsEncr = hashPartsUint.map(part => aes.encrypt(part));
  	normArray = [];
  	index = 0;
  	hashPartsEncr.map(array => {array.map(el => {normArray[index++] = el})});

  	enhash = normArray.map(el =>
  					[String.fromCharCode((el & 0xff000000) >> 24),
  					String.fromCharCode((el & 0x00ff0000) >> 16),
  					String.fromCharCode((el & 0x0000ff00) >> 8),
  					String.fromCharCode (el & 0x000000ff)].join('')
  					).join('');
  	cb(enhash);
      });
    });
  },

  verify: (pass, hash, cb) => {
    sha1Hash = sha1(pass);
  	var aes = new AES(aeskey);
  	hashParts = hash.match(/[^]{1,4}/g);

  	hashPartsUint = hashParts.map(part => Uint32Array.from(part.split('').map(ch => ch.charCodeAt(0))));
  	hashPartsRaw = hashPartsUint.map(array => {
  		return (array[0] << 24) + (array[1] << 16) + (array[2] << 8) + array[3];
  	});
  	hashPartsUintReady = [];
  	for (var i = 0; i < hashPartsRaw.length; i += 4) {
  		hashPartsUintReady.push(Uint32Array.from(hashPartsRaw.slice(i, i + 4)));
  	}
  	hashPartsEncr = hashPartsUintReady.map(part => aes.decrypt(part));
  	normArray = [];
  	index = 0;
  	hashPartsEncr.map(array => {array.map(el => {normArray[index++] = el})});

  	decrHashWithPadding = normArray.map(el => String.fromCharCode(el)).join('');
  	decrHash = decrHashWithPadding.replace(/\$+$/g, '');
  	argon2.verify(decrHash, sha1Hash).then(match => {
		cb(match);
		}).catch(err => {
		});
  }
}
