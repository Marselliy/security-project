var AES = require('aes');

module.exports = {
  aesEncryptString: (str, key, cb) => {
    var aes = new AES(key);
    parts = str.match(/[^]{1,4}/g);
    for (var key = 0; key < 4 - parts[parts.length - 1].length; key++) {
  		parts[parts.length - 1] += '$';
  	}
    partsUint = parts.map(part => Uint32Array.from(part.split('').map(ch => ch.charCodeAt(0))));
  	partsEncr = partsUint.map(part => aes.encrypt(part));
  	normArray = [];
  	index = 0;
  	partsEncr.map(array => {array.map(el => {normArray[index++] = el})});

  	encr = normArray.map(el =>
  					[String.fromCharCode((el & 0xff000000) >> 24),
  					String.fromCharCode((el & 0x00ff0000) >> 16),
  					String.fromCharCode((el & 0x0000ff00) >> 8),
  					String.fromCharCode (el & 0x000000ff)].join('')
  					).join('');
    cb(encr);
  },

  aesDecryptString: (str, key, cb) => {
    var aes = new AES(key);
    parts = str.match(/[^]{1,4}/g);

  	partsUint = parts.map(part => Uint32Array.from(part.split('').map(ch => ch.charCodeAt(0))));
  	partsRaw = partsUint.map(array => {
  		return (array[0] << 24) + (array[1] << 16) + (array[2] << 8) + array[3];
  	});
  	partsUintReady = [];
  	for (var i = 0; i < partsRaw.length; i += 4) {
  		partsUintReady.push(Uint32Array.from(partsRaw.slice(i, i + 4)));
  	}
  	partsEncr = partsUintReady.map(part => aes.decrypt(part));
  	normArray = [];
  	index = 0;
  	partsEncr.map(array => {array.map(el => {normArray[index++] = el})});

  	decrWithPadding = normArray.map(el => String.fromCharCode(el)).join('');
  	decr = decrWithPadding.replace(/\$+$/g, '');
    cb(decr);
  }
}
