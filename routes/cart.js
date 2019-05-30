const debug = require('debug')('api:cart')
const { Router } = require('express')

const router = Router()

const getCurrency = currencySymbol => {
  if (currencySymbol === '£') return 'GBP'
  if (currencySymbol === '¥') return 'YEN'
  if (currencySymbol === '€') return 'EUR'

  return 'USD'
}

const isTrue = val => {
  const falseValues = ['✗', 'null', 'undefined', 'false', 'F', 'N']

  if (falseValues.includes(val)) {
    return false
  }

  return !!val
}

const getOptions = req => {
  const currencySymbol = req.query.currency
  const currency = getCurrency(currencySymbol)

  return {
    currency,
    currencySymbol,
  }
}

module.exports = router.get('/', (req, res) => {
  const options = getOptions(req)
  debug('route options', options)

  const data = {
    ...options,
  }

  if (isTrue(req.query.json)) {
    res.json(data)
  } else {
    // res.send('Cart Home')
    res.render('cart', data)
  }
})
