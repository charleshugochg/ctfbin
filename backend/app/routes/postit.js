const express = require('express')
const router = express.Router()

let postit = ''

router.get('/', async (req, res) => {
  const data = req.query.data
  if (data === undefined) {
    return res.send(postit)
  } else {
    postit = data
    return res.send(postit)
  }
})

module.exports = {
  postitRouter: router
}