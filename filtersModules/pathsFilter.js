const { parse } = require('url');
const { includes, map, isString, some } = require('lodash');

module.exports = (req, paths) => some(map([].concat(paths), path => isString(path) ? compareUrls(path, getPathname(req.originalUrl)) : compareUrlAndMethod(path, req)));

function compareUrls(u1, u2) {
  return u1 == u2;
}

function compareUrlAndMethod({ urls, methods }, { originalUrl, method }) {
  return valueInArray(getPathname(originalUrl), urls) && (methods ? valueInArray(method, methods) : true);
}

function valueInArray(value, arrayValues) {
  return includes([].concat(arrayValues), value);
}

function getPathname(url) {
  return parse(url, true).pathname;
}
