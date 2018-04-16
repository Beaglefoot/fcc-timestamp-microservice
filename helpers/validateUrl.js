const validateUrl = (pathSegments = []) =>
  pathSegments.length === 2 && /^(\w|[%,])+$/.test(pathSegments[1]);

module.exports = validateUrl;
