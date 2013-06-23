Mimer [![Build Status](https://secure.travis-ci.org/heldr/mimer.png?branch=master)](http://travis-ci.org/heldr/mimer)
=========

A simple [Mime][mime] type getter built on top of [Node.js][nodejs].

AS MODULE
---------

**Browser version:**: `bower install mimer` or [Minified][browserminified] (with commonjs require included) [Source][browsersource] (with commonjs require included)

**Node.js version:** `npm install mimer` into your project


### Getting a mime type
```js

var Mimer = require('mimer.js');

// you can use
Mimer('file.css'); // => "text/css"

// or
var mime = new Mimer();
mime.get('file.css');  // => "text/css"

```

### Setting a mime type
```js

var Mimer = require('mimer.js'),
	mime = new Mimer();

mime.set('.monster', 'movie/thriller')
	.get('zombie.monster');
	// => "movie/thriller"

mime.set(['.rctycoon','.simcity'], 'cms/game');
mime.get('/land/park.rctycoon'); // => "cms/game"
mime.get('maps/city.simcity'); // => "cms/game"

```

AS CLIENT
---------

`npm install -g mimer` (it may require Root privileges)

### pritting a mime type
```CLI
$ mimer brand.png
```

DEVELOPING
----------

```CLI
$ make install
$ make test
```

Build web version with:

```CLI
$ make build
```

If you'd like to test the full process including npm installer, just run:

```CLI
$ make fulltest
```

## License

MIT License
(c) [Helder Santana](http://heldr.com)

[nodejs]: http://nodejs.org/download
[bower]: http://bower.io
[mime]: http://en.wikipedia.org/wiki/MIME
[browserminified]: https://raw.github.com/heldr/mimer/master/dist/mimer.min.js
[browsersource]: https://raw.github.com/heldr/mimer/master/dist/mimer.js