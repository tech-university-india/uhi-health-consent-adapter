const requiredHeaders = require('../config/requiredHeaders')
const getToken = require('./gateway')
const response = require('../utils/response')

async function healthId (path, method, headers, body) {
  const accessToken = await getToken.getToken()
  const requestHeaders = {}
  requiredHeaders.forEach((header) => {
    if (headers[header]) {
      requestHeaders[header] = headers[header]
    }
  })

  const res = await fetch(`${process.env.HEALTH_ID_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...requestHeaders
    },
    body: method === 'GET' ? undefined : JSON.stringify(body)
  })

  await response.checkForErrorsInResponse(res)
  const data = await response.convertToResponseBody(res)
  return {
    data,
    status: res.status
  }
}
module.exports = { healthId }
