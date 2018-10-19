/*global describe it */
const _ = require('lodash');
const { unless } = require('..');
const { assert } = require('chai');

const pathsTests = require('./pathsTests');
const extensionsTests = require('./extensionsTests');

function getUnlessTestMiddleware(options) {
  const testMiddleware = req => {
    req.called = true;
  };
  return unless(testMiddleware, options);
}

describe('express-middleware-condition', () => {
  describe('paths', () => {
    generateTests(pathsTests, { originalUrl: '/foo?test=tested', testKey: 'paths' });
  });
  describe('extensions', () => {
    _.each(extensionsTests, ({ originalUrl, tests }, testSubTitle) => {
      describe(testKeyToText(testSubTitle), () => {
        generateTests(tests, { originalUrl, testKey: 'extensions' });
      });
    });
  });
});

function generateTests(testsConf, { originalUrl, testKey }) {
  _.each(testsConf, (tests, testType) => {
    describe(testKeyToText(testType), () => {
      _.each(tests, ({ test, expected }) => {
        it(`should ${expected === 'false' ? 'not ' : ''}be called - ${originalUrl} - (${_.isObject(test) ? JSON.stringify(test) : test} - expected: ${expected})`, () => {
          const req = { originalUrl, method: 'GET', called: false };
          const mid = getUnlessTestMiddleware({ [testKey]: test });
          mid(req, {}, _.noop);
          assert[`is${_.capitalize(expected)}`](req.called);
        });
      });
    });
  });
}

function testKeyToText(key) {
  return _.capitalize(_.kebabCase(key).split('-').join(' '));
}
