const express = require('express')
const router = express.Router()

const { requireAuth } = require('./auth')

const Record = require('../models/Record')

router.get('/dump', requireAuth, async (req, res) => {
  const { limit } = req.query
  const records = await Record.find({}).limit(limit)
  res.json(records)
})

router.get('/flush', requireAuth, async (req, res) => {
  await Record.deleteMany({})
  res.send('OK')
})

router.get('/*', async (req, res) => {
  const record = {
    path: req.path,
    query: req.query,
    headers: req.headers,
    ip: req.ip
  }
  await Record(record).save()
  res.send('OK')
})

module.exports = {
  binRouter: router
}