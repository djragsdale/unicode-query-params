const server = require('./server')

const config = {
  port: process.env.PORT || 3000,
}

server(config)
