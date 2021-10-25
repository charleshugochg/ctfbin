const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { authRouter } = require('./routes/auth')
const { binRouter } = require('./routes/bin')

const PORT = process.env.PORT || 5000

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send(`Hello World!`)
})

app.use('/auth', authRouter)
app.use('/bin', binRouter)

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})
