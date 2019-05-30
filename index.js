if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const server = require('./server')

const config = {
  port: process.env.PORT || 3000,
}

server(config)
