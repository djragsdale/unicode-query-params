const debug = require('debug')('api:cart')
const { Router } = require('express')

const router = Router()

const currencies = {
  $: 'USD',
  '£': 'GBP',
  '¥': 'YEN',
  '€': 'EUR',
}

const getCurrency = currencySymbol => {
  if (currencySymbol in currencies) {
    return currencies[currencySymbol]
  }

  return currencies['$']
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
  const isPercent = req.query.savings !== '¼'

  return {
    currency,
    currencySymbol,
    isAnnual,
    isPercent,
  }
}

module.exports = router.get('/', (req, res) => {
  const options = getOptions(req)
  debug('route options', options)

  const pricingStructure = {
    free: {
      annually: 0,
      monthly: 0,
    },
    pro: {
      annually: 150,
      monthly: 15,
    },
    enterprise: {
      annually: 270,
      monthly: 30,
    },
  }

  const data = {
    ...options,
    prices: {
      free: {
        amount: options.isAnnual
          ? `${options.currencySymbol}${pricingStructure.free.annually}`
          : `${options.currencySymbol}${pricingStructure.free.monthly}`,
        term: options.isAnnual ? 'yr' : 'mo',
      },
      pro: {
        amount: options.isAnnual
          ? `${options.currencySymbol}${pricingStructure.pro.annually}`
          : `${options.currencySymbol}${pricingStructure.pro.monthly}`,
        term: options.isAnnual ? 'yr' : 'mo',
      },
      enterprise: {
        amount: options.isAnnual
          ? `${options.currencySymbol}${pricingStructure.enterprise.annually}`
          : `${options.currencySymbol}${pricingStructure.enterprise.monthly}`,
        term: options.isAnnual ? 'yr' : 'mo',
      },
    },
  }

  if (options.isAnnual) {
    data.prices.free.savings = options.isPercent
      ? '0% savings'
      : '0/12 months free'
    data.prices.pro.savings = options.isPercent
      ? '17% savings'
      : '2/12 months free'
    data.prices.enterprise.savings = options.isPercent
      ? '25% savings'
      : '3/12 months free'
  }

  if (isTrue(req.query.json)) {
    res.json(data)
  } else {
    // res.send('Cart Home')
    res.render('cart', data)
  }
})
