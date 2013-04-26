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
        if (!(ext instanceof Array)) {
            if (ext.match('.')) {
                ext = ext.replace('.','');
            }
            this.list[ext] = type;
        } else {
            for ( var i = 0; i < ext.length; i++ ) {
                this.set(ext[i], type);
            }
        }
    },

    get : function ( ext ) {
        ext = this.extGetter(ext).split('.')[1];
        return ( this.list[ext] ) ? this.list[ext] : '\nInvalid extension';
    },

    list : require('./extensions/single'),

    _loadMultipleList : function () {
        var multiple = require('./extensions/multiple');

        for (var item in multiple) {
            if ( multiple.hasOwnProperty(item) ) {
                this.set( multiple[item] , item );
            }
        }
    }
};

module.exports = Mimetyper;
