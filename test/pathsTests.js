const { tail } = require('lodash');

const urls = ['/foo', '/bar', '/baz'];
const methods = ['GET', 'POST', 'PUT'];

module.exports = {
  stringPath: [
    { test: urls[0], expected: 'false' },
    { test: urls[1], expected: 'true' },
  ],
  arrayOfStringsPaths: [
    { test: urls, expected: 'false' },
    { test: tail(urls), expected: 'true' },
  ],
  arrayOfObjectsWithoutMethods: [
    { test: { urls }, expected: 'false' },
    { test: { urls: tail(urls) }, expected: 'true' },
  ],
  arrayOfObjectsWithStringAsMethods: [
    { test: { urls, methods: methods[0] }, expected: 'false' },
    { test: { urls: tail(urls), methods: methods[0] }, expected: 'true' },
    { test: { urls, methods: methods[1] }, expected: 'true' },
    { test: { urls: tail(urls), methods: methods[1] }, expected: 'true' },
  ],
  arrayOfObjectsWithArrayOfMethods: [
    { test: { urls, methods }, expected: 'false' },
    { test: { urls: tail(urls), methods }, expected: 'true' },
    { test: { urls, methods: tail(methods) }, expected: 'true' },
    { test: { urls: tail(urls), methods: tail(methods) }, expected: 'true' },
  ],
};
