(function (root, factory) {
    'use strict';

    function lodashObjectPairs(object) {
        var index  = -1,
            props  = Object.keys(object),
            length = props.length,
            result = Array(length);

        while (++index < length) {
            var key       = props[index];
            result[index] = [key, object[key]];
        }
        return result;
    }

    if (typeof define === 'function' && define.amd) {
        // AMD
        define('lodashPairs', [], function () {
            return lodashObjectPairs;
        });
        define('specs', ['dist/mimer', 'lodashPairs', 'node_modules/chai/chai'], factory);
    } else if (typeof exports === 'object') {
        // Node
        factory(require('../mimer.js'), lodashObjectPairs, require('assert'));
    } else {
        // Browser globals (root is window)
        factory(root.Mimer, lodashObjectPairs, root.chai.assert);
    }
}(this, function (Mimer, _pairs, assert) {

    var instance  = Mimer(),
        extList   = Mimer().list,
        path      = '/i/am/a/simple/path/file.',
        url       = 'http://fake.com/umk/files/file.',
        cases     = {},
        case_log = (typeof process !== 'undefined') ? console.log : function (text) {
            var li = document.createElement('li');

            li.textContent = text.replace(/\n/g, '');

            document.getElementById('results').appendChild(li);
        },
        expected;

    assert = assert.strictEqual ? assert : assert.assert;

    // test cases

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


    var pairs = _pairs(cases), size = pairs.length, last = size - 1, case_text = '';

    if (typeof window !== 'undefined' && window.callPhantom) {
        case_log = function(text, done) {
            window.callPhantom({
                text: text,
                done: done
            });
        };

        window.onerror = function (errorMsg, file, line) {
           this.callPhantom({
                text: errorMsg + ' - file: ' + file + ' - line: ' + line,
                error: true
           });
        }
    }

    pairs.forEach(function (test_case, index) {
        case_text = '\n - ' + test_case[0] + ' - done!';

        test_case[1]();

        case_log(case_text);

        if(index === last) {
            case_log('\n All ' + size + ' specs have successfully worked', '\n');
        }

    });

}));
