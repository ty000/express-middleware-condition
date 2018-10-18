/*global describe it */
const _ = require('lodash');
const { unless } = require('..');
const { assert } = require('chai');

const pathsTests = require('./pathsTests');

function getUnlessTestMiddleware(options) {
  const testMiddleware = req => {
    req.called = true;
  };
  return unless(testMiddleware, options);
}

describe('express-middleware-condition', () => {
  _.each(pathsTests, (tests, testType) => {
    describe(testKeyToText(testType), () => {
      _.each(tests, ({ test, expected }) => {
        it(`should ${expected === 'false' ? 'not ' : ''}be called - (${_.isObject(test) ? JSON.stringify(test) : test} - expected: ${expected})`, () => {
          const req = { originalUrl: '/foo?test=tested', method: 'GET', called: false };
          const mid = getUnlessTestMiddleware({ paths: test });
          mid(req, {}, _.noop);
          assert[`is${_.capitalize(expected)}`](req.called);
        });
      });
    });
  });
});

function testKeyToText(key) {
  return _.capitalize(_.kebabCase(key).split('-').join(' '));
}
