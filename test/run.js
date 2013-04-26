var Mimetyper = require("../lib/exec.js"),
    instance = Mimetyper(),
    assert  = require("assert"),
    _       = require("lodash"),
    extList = Mimetyper().list,
    path = '/i/am/a/simple/path/file.',
    url = 'http://fake.com/umk/files/file.',
    cases = {}, expected;


cases['should create a extension without dot'] = function () {
    instance.set('fake','text/fake');

    assert.strictEqual( instance.get('file.fake') , 'text/fake');
}

cases['should create a extension with dot'] = function () {
    instance.set('.fake2','text/fake');

    assert.strictEqual( instance.get('file.fake2') , 'text/fake');
}

cases['should create multiple extensions'] = function () {
    instance.set(['.audi','tesla'],'vehicle/car');

    assert.strictEqual( instance.get('file.audi') , 'vehicle/car');
    assert.strictEqual( instance.get('file.tesla') , 'vehicle/car');
}

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
            assert.strictEqual( instance.get(path + ext) , expected);
        };

        cases['should run as object method and get extension .' + ext + ' from ' + url + ext] = function () {
            assert.strictEqual( instance.get(url + ext) , expected);
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