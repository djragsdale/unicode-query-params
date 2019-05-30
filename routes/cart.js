const debug = require('debug')('api:cart')
const { Router } = require('express')

const router = Router()

const getCurrency = (currencySymbol) => {
  if (currencySymbol === '£') return 'GBP'
  if (currencySymbol === '¥') return 'YEN'
  if (currencySymbol === '€') return 'EUR'

  return 'USD'
}

const isTrue = (val) => {
  const falseValues = [
    '✗',
    'null',
    'undefined',
    'false',
    'F',
    'N',
  ]

  if (falseValues.includes(val)) {
    return false
  }

  return !!val
}

const getOptions = (req) => {
  const currency = getCurrency(req.query.currency)

  return {
    currency,
  }
}

module.exports = router
  .get('/', (req, res) => {
    console.log('route')
    const options = getOptions(req)

    if (isTrue(req.query.json)) {
      res.json(options)
    } else {
      // res.send('Cart Home')
      res.render('cart', options)
    }
  })
