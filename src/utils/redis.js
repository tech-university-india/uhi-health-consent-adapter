const Redis = require('ioredis')

const client = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST
})

const setCache = async (key, value, expiry) => {
  await client.set(key, value, 'EX', expiry)
}

const getCache = async key => {
  const cacheData = await client.get(key)
  return cacheData
}

module.exports = {
  setCache,
  getCache
}
