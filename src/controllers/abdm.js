const healthId = require('../services/healthId')
const RequestError = require('../utils/requestError')
const abdm = async (req, res) => {
  try {
    const { baseUrl: path, method, headers, body } = req
    const response = await healthId(path, method, headers, body)
    res.status(response.status).json(response.data)
  } catch (error) {
    if (error instanceof RequestError) {
      res.status(error.status).json({ message: error.message })
    } else {
      console.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
module.exports = abdm
