const requiredHeaders = require('../config/requiredHeaders')
const getToken = require('./gateway')
const specialRoutes = require('../config/specialRoutes')
const { checkForErrorsInResponse, convertToResponseBody } = require('../utils/response')

const healthId = async (path, method, headers, body) => {
  const accessToken = await getToken()
  const requestHeaders = {}
  requiredHeaders.forEach((header) => {
    if (headers[header]) {
      requestHeaders[header] = headers[header]
    }
  })

  const response = await fetch(`${process.env.HEALTH_ID_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...requestHeaders
    },
    body: method === 'GET' ? undefined : JSON.stringify(body)
  })
  await checkForErrorsInResponse(response)
  if (specialRoutes[path]) {
    return {
      data: await specialRoutes[path](response),
      status: response.status
    }
  }
  const data = await convertToResponseBody(response)
  return {
    data,
    status: response.status
  }
}
module.exports = healthId
