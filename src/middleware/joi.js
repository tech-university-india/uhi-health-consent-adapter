const pathMap = require('../config/pathMap')

const requestValidator = (req, res, next) => {
  console.log("requestValidator");
  const schema = pathMap[req.url]
  if (!schema) {
    res.status(404).json({ message: 'Not Found' })
    return
  }
  if (req.method.toLowerCase() !== 'get') {
    const { error } = schema.validate(req.body)
    if (error) {
      res.status(400).json({ message: error.message })
      return
    }
  }

  console.log("next");
  next()
}

module.exports = requestValidator
