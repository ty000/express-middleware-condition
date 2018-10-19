const { parse } = require('url');
const { extname } = require('path');
const { includes, map, startsWith, intersection } = require('lodash');

module.exports = filterByExtension;

function filterByExtension({ originalUrl } = {}, extensions = []) {
  extensions = [].concat(extensions);
  const urlExtension = extname(parse(originalUrl, true).pathname);
  if (!urlExtension)
    return false;
  if (intersection(extensions, ['.*', '*']).length)
    return true;
  const formattedExt = map(extensions, extension => startsWith(extension, '.') ? extension : `.${extension}`);
  return includes(formattedExt, urlExtension);
}
