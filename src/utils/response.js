const RequestError = require('./requestError')

/**
 * @param {Response} response
 */
const checkForErrorsInResponse = async (response) => {
  if (!response.ok) {
    const data = await convertToResponseBody(response)
    if (data.error) {
      throw new RequestError(data.error.message ?? 'Some ABDM Error Occurred', response.status ?? data.error.code)
    }
    throw new RequestError('Some unknown error', response.status)
  }
}

const convertToResponseBody = async (response) => {
  const data = await response.text()
  try {
    const json = JSON.parse(data)
    return json
  } catch (error) {
    return data
  }
}

module.exports = {
  checkForErrorsInResponse,
  convertToResponseBody
}
