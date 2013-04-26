/*
 * mimetyper
 * https://github.com/heldr/mimetyper
 *
 * Copyright (c) 2013 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/mimetyper/master/MIT-LICENSE.txt
 */

var Mimetyper = function (extPath) {
    if (!(this instanceof Mimetyper)) {
        if (extPath) {
            return Mimetyper().get(extPath);
        }
        return new Mimetyper();
    }

    this._loadMultipleList();
}

Mimetyper.prototype = {
    extGetter : require('./extensions/getter'),

    set : function ( ext , type ) {
        this.list[ext] = type;
    },

    get : function ( ext ) {
        ext = this.extGetter(ext).split('.')[1];
        return ( this.list[ext] ) ? this.list[ext] : console.log('\nInvalid extension');
    },

    setMultiple : function ( list , type ) {
        for ( var i = 0; i < list.length; i++ ) {
            this.set( list[i] , type );
        }
    },

    list : require('./extensions/single'),

    _loadMultipleList : function () {
        var multiple = require('./extensions/multiple');

        for (var item in multiple) {
            if ( multiple.hasOwnProperty(item) ) {
                this.setMultiple( multiple[item] , item );
            }
        }
    }
};

module.exports = Mimetyper;
