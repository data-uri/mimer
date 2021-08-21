# Mimer [![Build Status](https://github.com/data-uri/mimer/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/data-uri/mimer/actions/workflows/main.yml?query=branch%3Amain)

> Another [MIME](http://en.wikipedia.org/wiki/MIME) type module. Exposes an extension Map reference of [mime-db](https://npm.im/mime-db) but with zero dependencies.

## MODULE

### Getting started
```js
const mimer = require('mimer');

mimer('.pdf'); // -> "application/pdf"
mimer('pdf'); // -> "application/pdf"
mimer('../readme.pdf'); // -> "application/pdf"
mimer('pedefe'); // -> "application/octet-stream"
```

#### Extension Map
```js
const mimer = require('mimer');
const mimerMap = require('mimer/map');

mimerMap.get('pdf'); // -> "application/pdf"
mimerMap.set('graphql', 'application/graphql');
mimer('content.graphql'); // -> "application/graphql"
```

#### Safe mode
In case you want to avoid changes on original Map for safety.
```js
const mimer = require('mimer/safe');
const mimerMap = require('mimer/map');

mimerMap.set('graphql', 'application/graphql');
mimer('content.graphql'); // -> "application/octet-stream"
```

## CLI

```sh
npm install -g mimer
mimer readme.pdf
```
or just

```sh
npx mimer readme.pdf
```

## DEVELOPING

```CLI
$ npm i
$ npm test
```

## Release notes

See more in [Releases section](https://github.com/data-uri/mimer/releases).

## License

MIT License
(c) [Helder Santana](http://heldr.com)