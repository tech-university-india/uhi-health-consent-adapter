const { HttpError } = require('./httpError')

const errorHandlerInRoute = (error, req, res) => {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({ message: error.message })
  }
  res.status(500).json({ message: 'Internal server error' })
}

module.exports = { errorHandlerInRoute }
