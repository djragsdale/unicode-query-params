module.exports = [
  {
    route: '/',
    middleware: require('./readmeRenderer'),
  },
  {
    route: '/cart',
    middleware: require('./cart'),
  },
]
