'use strict';
module.exports = function (mimetypesFile) {
    var fs     = require('fs'),
        obj    = Object.create(null),
        config = null,
        mime   = null;

    fs.readFileSync(mimetypesFile, 'utf-8')
        .split('\n')
        .filter(function (line) {
            return (!line.match(/^#/));
        }).forEach(function (line) {
            config = line.replace(/\t+|\t+$/g, ' ').split(' ');
            mime = config.shift();

            config.forEach(function (extension) {
                obj[extension] = mime;
            });
        });

    return obj;
};
