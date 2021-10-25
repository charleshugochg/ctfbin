const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { authRouter } = require('./routes/auth')
const { binRouter } = require('./routes/bin')

const PORT = process.env.PORT || 5000

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', express.static('static'))

app.use('/auth', authRouter)
app.use('/bin', binRouter)

app.use('/delay', async (req, res) => {
  const timeout = req.query.timeout || 0
  await new Promise(resolve => setTimeout(resolve, timeout))
  res.status(404).send('Time\'s up!')
})

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})
