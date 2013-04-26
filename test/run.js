var Mimetyper = require("../lib/exec.js"),
    assert  = require("assert"),
    _       = require("lodash"),
    extList = Mimetyper().list,
    path = '/i/am/a/simple/path/file.',
    url = 'http://fake.com/umk/files/file.',
    cases = {}, expected;

for (var ext in extList) {
    if (extList.hasOwnProperty(ext)) {
        expected = extList[ext];

        cases['should run as function and get extension .' + ext + ' from ' + path + ext] = function () {
            assert.strictEqual( Mimetyper(path + ext) , expected);
        };

        cases['should run as function and get extension .' + ext + ' from ' + url + ext] = function () {
            assert.strictEqual( Mimetyper(url + ext) , expected);
        };

        cases['should run as object method and get extension .' + ext + ' from ' + path + ext] = function () {
            assert.strictEqual( Mimetyper().get(path + ext) , expected);
        };

        cases['should run as object method and get extension .' + ext + ' from ' + url + ext] = function () {
            assert.strictEqual( Mimetyper().get(url + ext) , expected);
        };
    }
}

var pairs = _.pairs(cases), last = _.last(pairs);

_.each( pairs , function (test_case) {

    console.log( '\n - ' + test_case[0] );
    test_case[1]();
    console.log(' - done!');

    if( test_case === last ) {
        console.log( '\n All ' + _.size(cases) + ' specs have successfully worked \n' );
    }

});