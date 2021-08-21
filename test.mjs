import { strict as assert } from "assert";
import mimeMap from './map.js';
import mimer from './index.js';
import mimerSafe from './safe.js';

// Map
assert.equal(mimeMap.get('pdf'), 'application/pdf');
assert.equal(mimeMap.get('_'), undefined);

// Module
assert.equal(mimer('.pdf'), 'application/pdf');
assert.equal(mimer('pdf'), 'application/pdf');
assert.equal(mimer('../test.pdf'), 'application/pdf');
assert.equal(mimer('_'), 'application/octet-stream');

// Custom extension and Safe mode
mimeMap.set('graphql', 'application/graphql');
assert.equal(mimer('../test.graphql'), 'application/graphql');
assert.equal(mimerSafe('../test.graphql'), 'application/octet-stream');
assert.equal(mimerSafe('../test.pdf'), 'application/pdf');
