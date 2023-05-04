const jwt = require('jsonwebtoken')
const { setCache, getCache } = require('./cache')
const Response = require('./response')

let DEFAULT_EXPIRY = 60 * 1000

const cacheFetch = async (requestOptions, isToken) => {
  const cacheData = getCache(requestOptions.url)
  if (cacheData) {
    return JSON.parse(cacheData)
  }
  const url = requestOptions.url
  delete requestOptions.url
  const response = await fetch(url, requestOptions)
  await Response.checkForErrorsInResponse(response)
  const data = await Response.convertToResponseBody(response)
  if (isToken) {
    const { exp } = jwt.decode(data.accessToken ?? data)
    DEFAULT_EXPIRY = (exp - ((Math.floor(Date.now() / 1000) - 60))) * 1000
  }

  setCache(
    url,
    JSON.stringify(data.accessToken ? data : { accessToken: data }),
    DEFAULT_EXPIRY
  )
  return data.accessToken ? data : { accessToken: data }
}

module.exports = { cacheFetch }
