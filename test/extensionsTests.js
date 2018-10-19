const { tail, map, mapValues, assign } = require('lodash');
const EXTENSIONS = ['.jpg', '.css', '.html'];

const baseTests = {
  extensionAsString: [
    { test: EXTENSIONS[0], expected: 'false' },
    { test: EXTENSIONS[1], expected: 'true' },
  ],
  extensionAsStringWithoutDot: [
    { test: removeDots(EXTENSIONS)[0], expected: 'false' },
    { test: removeDots(EXTENSIONS)[1], expected: 'true' },
  ],
  extensionAsArray: [
    { test: EXTENSIONS, expected: 'false' },
    { test: tail(EXTENSIONS), expected: 'true' },
  ],
  extensionAsArrayWithoutDot: [
    { test: removeDots(EXTENSIONS), expected: 'false' },
    { test: tail(removeDots(EXTENSIONS)), expected: 'true' },
  ],
  everyExtensions: [
    { test: '*', expected: 'false' },
    { test: '.*', expected: 'false' },
    { test: ['*'], expected: 'false' },
    { test: ['.*'], expected: 'false' },
  ],
};

module.exports = {
  extensionsTestsOnFileRequest: {
    tests: baseTests,
    originalUrl: '/foo.jpg',
  },
  extensionsTestsOnRequestWithoutExtension: {
    tests: mapValues(baseTests, subTests => map(subTests, subTest => assign({}, subTest, { expected: 'true' }))),
    originalUrl: '/foo?bar=u.ri.dot',
  },
};

function removeDots(EXTENSIONS) {
  return map(EXTENSIONS, ext => ext.substr(1));
}
