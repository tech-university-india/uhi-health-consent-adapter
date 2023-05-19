const cache = require('memory-cache');

const setCache = (key, value, expiry) => {
  cache.put(key, value, expiry);
};

const getCache = key => {
  return cache.get(key);
};

module.exports = {
  setCache,
  getCache,
};
