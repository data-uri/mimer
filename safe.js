const imap = new Map(require('./map'));
const mimer = require('.');

module.exports = (input) => mimer(input, imap);
