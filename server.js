const debug = require('debug')('server')
const express = require('express')

const routes = require('./routes')

module.exports = (config) => {
  const app = express()

  app.set('view engine', 'ejs')

  routes.forEach(({ route, middleware }) => {
    app.use(route, middleware)
  })

  app.listen(config.port, null)
  debug(`Listening on port "${config.port}"`)
}
