require('dotenv').config()
const express = require('express')
const abdm = require('./src/controllers/abdm')
const requestValidator = require('./src/middleware/joi')

const app = express()

app.use(express.json())
app.use(express.text())
app.use(requestValidator)

const PORT = process.env.PORT || 9006

app.use('*', abdm)

app.listen(PORT, () => console.log(`Started on port ${PORT}`))
