String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

filter = message => message.replaceAll(/<(\/*?)(?!(em|p|br\s*\/|strong))\w+?.+?>/igm, '');
addSmiles = (message, smiles) => {
  probSmiles = message.match(/:[^:]+:/g);
  probSmiles = probSmiles.filter(smile => smiles.indexOf(smile.substring(1, smile.length - 1) + '.png') != -1);
  probSmiles.map(smile => {message = message.replace(smile, '<img src="/images/smiles/' + (smile.substring(1, smile.length - 1) + '.png') + '" />')});
  return message
}
