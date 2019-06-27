const debug = require('debug')('api:readme')
const { Router } = require('express')
const fs = require('fs')
const marked = require('marked')
const path = require('path')

const router = Router()

let readmeMarkdown
fs.readFile(path.join(__dirname, '../README.md'), (err, data) => {
  if (err) {
    debug('Error reading README.md')
    throw err
  }

  debug('Loaded README.md')
  readmeMarkdown = data.toString()
})

module.exports = router.get('/', (req, res) => {
  if (!readmeMarkdown) {
    res.status(500).send('README not available')
    return
  }

  const content = marked(readmeMarkdown)

  res.render('docs', { content })
})
