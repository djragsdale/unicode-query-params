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

  const isAnnual = isTrue(req.query.annual)

  return {
    currency,
    currencySymbol,
    isAnnual,
  }
}

module.exports = router.get('/', (req, res) => {
  const options = getOptions(req)
  debug('route options', options)

  const pricingStructure = {
    free: {
      annually: '$0',
      monthly: '$0',
    },
    pro: {
      annually: '$150',
      monthly: '$15',
    },
    enterprise: {
      annually: '$250',
      monthly: '$29',
    },
  }

  const data = {
    ...options,
    prices: {
      free: {
        amount: options.isAnnual
          ? pricingStructure.free.annually
          : pricingStructure.free.monthly,
        term: options.isAnnual ? 'yr' : 'mo',
      },
      pro: {
        amount: options.isAnnual
          ? pricingStructure.pro.annually
          : pricingStructure.pro.monthly,
        term: options.isAnnual ? 'yr' : 'mo',
      },
      enterprise: {
        amount: options.isAnnual
          ? pricingStructure.enterprise.annually
          : pricingStructure.enterprise.monthly,
        term: options.isAnnual ? 'yr' : 'mo',
      },
    },
  }

  if (isTrue(req.query.json)) {
    res.json(data)
  } else {
    // res.send('Cart Home')
    res.render('cart', data)
  }
})
