const debug = require('debug')('server')
const express = require('express')
// const morgan = require('morgan')

const routes = require('./routes')

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

module.exports = (config) => {
  console.log('Bootstrapping server')

  const app = express()

  // app.use(morgan('combined'))

  routes.forEach(({ route, middleware }) => {
    app.use(route, middleware)
  })

  app.listen(config.port, null)
  console.log(`Listening on port "${config.port}"`)
}
