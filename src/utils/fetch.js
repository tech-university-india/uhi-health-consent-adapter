const jwt = require('jsonwebtoken')
const { setCache, getCache } = require('./redis')
const { checkForErrorsInResponse, convertToResponseBody } = require('./response')

let DEFAULT_EXPIRY = 60

const cacheFetch = async (requestOptions, isToken) => {
  const cacheData = await getCache(requestOptions.url)
  if (cacheData) {
    return JSON.parse(cacheData)
  }
  const url = requestOptions.url
  delete requestOptions.url
  const response = await fetch(url, requestOptions)
  await checkForErrorsInResponse(response)

  const data = await convertToResponseBody(response)
  if (isToken) {
    const { exp } = jwt.decode(data.accessToken ?? data)
    DEFAULT_EXPIRY = exp - Math.floor(Date.now() / 1000) - 60
  }

  await setCache(requestOptions.url, JSON.stringify(data.accessToken ? data : { accessToken: data }), DEFAULT_EXPIRY)
  return data.accessToken ? data : { accessToken: data }
}

module.exports = { cacheFetch }
