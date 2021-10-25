const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { authRouter } = require('./routes/auth')
const { binRouter } = require('./routes/bin')
const { documentRouter } = require('./routes/document')
const { postitRouter } = require('./routes/postit')

const PORT = process.env.PORT || 5000

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', express.static('./static'))

app.use('/api/documents', documentRouter)
app.use('/api/auth', authRouter)
app.use('/api/bin', binRouter)
app.use('/api/postit', postitRouter)

app.use('/api/delay', async (req, res) => {
  const timeout = req.query.timeout || 0
  await new Promise(resolve => setTimeout(resolve, timeout))
  res.status(404).send('Time\'s up!')
})

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})
