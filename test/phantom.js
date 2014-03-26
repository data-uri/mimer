var page = require('webpage').create();
var fs   = require('fs');
var url  = require('system').args[1];

page.onCallback = function (message) {
    console.log(message.text);

    if (message.error) {
        phantom.exit(1);
    }

    if (message.done) {
        phantom.exit(0);
    }
}

page.onResourceRequested = function (request) {
    console.log('Request ' + JSON.stringify(request, undefined, 4));
};


page.open(url);
