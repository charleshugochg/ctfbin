const express = require('express')
const router = express.Router()

const { requireAuth } = require('./auth')

const Record = require('../models/Record')

router.get('/', requireAuth, async (req, res) => {
  const limit = req.query.limit && Number(req.query.limit) || 10
  const records = await Record.find({}).limit(limit)
  res.json(records)
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

router.delete('/', requireAuth, async (req, res) => {
  await Record.deleteMany({})
  res.send('OK')
})

router.delete('/:id', requireAuth, async (req, res) => {
  const id = req.params.id
  if (!id || id == '') {
    return res.status(400).send('Invalid id.')
  }
  try {
    await Record.deleteOne({ _id: id })
    res.send('OK')
  }
  catch (err) {
    return res.status(500).send('Sorry.')
  }
})

module.exports = {
  binRouter: router
}