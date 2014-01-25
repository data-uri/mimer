var Mimer = require("../lib/exec.js"),
    instance = Mimer(),
    assert  = require("assert"),
    _       = require("lodash"),
    extList = Mimer().list,
    path = '/i/am/a/simple/path/file.',
    url = 'http://fake.com/umk/files/file.',
    cases = {}, expected;

cases['should return generic mime octet-stream if get function has no param given'] = function () {
    assert.strictEqual( instance.get() , 'application/octet-stream');
}

cases['should return generic mime octet-stream'] = function () {
    assert.strictEqual( instance.get('file.fake') , 'application/octet-stream');
}

cases['should create a extension without dot'] = function () {
    assert.strictEqual( instance.set('fake','text/fake').get('file.fake') , 'text/fake');
}

cases['should create a extension with dot'] = function () {

    assert.strictEqual( instance.set('.fake2','text/fake').get('file.fake2') , 'text/fake');
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
            assert.strictEqual( Mimer(path + ext) , expected);
        };

        cases['should run as function and get extension .' + ext + ' from ' + url + ext] = function () {
            assert.strictEqual( Mimer(url + ext) , expected);
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