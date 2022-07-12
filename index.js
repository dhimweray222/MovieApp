const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index.route')
const errorHandler = require('./helpers/errorHandler.helper')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
require('dotenv').config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))

app.use(express.static('public'))
app.use(routes)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})