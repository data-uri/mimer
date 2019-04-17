'use strict';

const Mimer = require('./');
const instance  = Mimer();
const extList = Mimer().list;
const path = '/i/am/a/simple/path/file.';
const url  = 'http://fake.com/umk/files/file.';

let expected;

describe('Mimer', () => {
    it('should return generic mime octet-stream if get function has no param given', () => {
        expect(instance.get()).toBe('application/octet-stream');
    });
    
    it('should return generic mime octet-stream', () => {
        expect(instance.get('file.fake')).toBe('application/octet-stream');
    });

    it('should create a extension without dot', () => {
        expect(instance.set('fake','text/fake').get('file.fake')).toBe('text/fake');
    });

    it('should create a extension with dot', () => {

        expect( instance.set('.fake2','text/fake').get('file.fake2')).toBe('text/fake');
    });
    
    it('should create multiple extensions', () => {
        instance.set(['.audi','tesla'],'vehicle/car');
    
        expect( instance.get('file.audi')).toBe('vehicle/car');
        expect( instance.get('file.tesla')).toBe('vehicle/car');
    });

    for (var ext in extList) {
        if (extList.hasOwnProperty(ext)) {
            expected = extList[ext];
    
            it('should run as function and get extension .' + ext, () => {
                expect(Mimer(ext)).toBe(expected);
            });
    
            it('should run as function and get extension .' + ext + ' from ' + path + ext, () => {
                expect( Mimer(path + ext)).toBe(expected);
            });
    
            it('should run as function and get extension .' + ext + ' from ' + url + ext, () => {
                expect( Mimer(url + ext)).toBe(expected);
            });
    
            it('should run as object method and get extension .' + ext + ' from ' + path + ext, () => {
                expect( instance.get(path + ext)).toBe(expected);
            });
    
            it('should run as object method and get extension .' + ext + ' from ' + url + ext, () => {
                expect( instance.get(url + ext)).toBe(expected);
            });
        }
    }

});
