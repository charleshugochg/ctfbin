const express = require('express')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/User')

const SECRET_KEY = process.env.SECRET_KEY || crypto.randomBytes(30).toString('hex')

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256')
  const hash = sha256.update(password).digest('base64')
  return hash;
}

const generateAuthToken = () => {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
  }, SECRET_KEY)
}

router.post('/login', async (req, res) => {
  const { password } = req.body
  if (!password) {
    return res.status(400).send('require password')
  }
  const passwordHash = getHashedPassword(password)

  const user = await User.findOne({ passwordHash })

  if (user) {
    const authToken = generateAuthToken()

    res.cookie('AuthToken', authToken, {maxAge: Date.now() + (1000 * 60 * 60 * 24 * 7)})
    res.status(200).send('Success')
  } else {
    res.status(401).send('Unauthorized')
  }
})

const requireAuth = (req, res, next) => {
  const authToken = req.cookies['AuthToken']
  if (!authToken) {
    return res.status(400).send('require AuthToken')
  }
  jwt.verify(authToken, SECRET_KEY, (err, authenticated) => {
    if (err || !authenticated) {
      res.cookie('AuthToken', '', {maxAge: Date.now() - 1000})
      return res.status(401).send('Invalid Token!')
    }
    next()
  })
}

router.get('/protected', requireAuth, (req, res) => {
  res.send('Authenticated')
})

module.exports = {
  requireAuth,
  authRouter: router
}