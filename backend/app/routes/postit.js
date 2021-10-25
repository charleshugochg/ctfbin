const express = require('express')
const router = express.Router()

let postit = ''

router.get('/', async (req, res) => {
  return res.send(postit)
})

router.get('/set/*', async (req, res) => {
  const data = req.path.slice(5)
  postit = data
  return res.send(postit)
})

module.exports = {
  postitRouter: router
}