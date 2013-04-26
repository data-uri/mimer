/*
 * mimetyper
 * https://github.com/heldr/mimetyper
 *
 * Copyright (c) 2013 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/mimetyper/master/MIT-LICENSE.txt
 */

var args = process.argv,
    Mimetyper = require('./mimetyper');

console.log( '"' + Mimetyper( process.argv[2] ) + '"' );
