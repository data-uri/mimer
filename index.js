const { extname } = require('path');
const defaultMap = require('./map');
const defaultExt = 'application/octet-stream';

module.exports = (input, extMap = defaultMap) =>
    extMap.get(extname(`_${input.startsWith('.') ? '' : '.'}${input}`).slice(1))
    || defaultExt;
