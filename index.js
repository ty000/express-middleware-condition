const { partial, map, some, get } = require('lodash');
const filters = require('./filtersModules');

module.exports = { unless, unlessLoginPath };

function unlessLoginPath(middleware) {
  return unless(middleware, { paths: '/login' });
}

function unless(middleware, options = {}) {
  return (req, res, next) => shouldSkipMiddleware(req, options) ? next() : middleware(req, res, next);
}

function shouldSkipMiddleware(req, options) {
  return some(map(options, partial(executeFilter, req)));
}

function executeFilter(req, filterValues, filterName) {
  return get(filters, filterName, partial(filterNameUnknown, filterName))(req, filterValues);
}

function filterNameUnknown(filterName) {
  console.log(`Unknown filter name: ${filterName}`);
}
