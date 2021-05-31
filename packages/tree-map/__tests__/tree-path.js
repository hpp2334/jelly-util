/// <reference types="@types/jest" />

const { parseTreePathString } = require('../');


test.each([
  [0, ['0']],
  [123, ['123']],
  ['ab', ['ab']],
  ['/a/b/c/', ['a', 'b', 'c']],
  ['/a/b/c', ['a', 'b', 'c']],
  ['a/b/c/', ['a', 'b', 'c']],
  ['a/b/c', ['a', 'b', 'c']],
  ['a\\/b/c', ['a/b', 'c']],
  ['a\\\\/b/c', ['a\\', 'b', 'c']],
  ['a/\\b/dd/\\ce\\\\\\\/f', ['a', 'b', 'dd', 'ce\\/f']],
])(
  'convert "%s" to %o',
  (src, des) => {
    expect(parseTreePathString(src)).toEqual(des);
  }
);

test.each([
  [''],
  ['/'],
  ['//'],
  ['ab/add//dde'],
  ['a/b/c\\'],
])(
  'convert "%s" expect error',
  (src) => {
    expect(() => parseTreePathString(src)).toThrow();
  }
);