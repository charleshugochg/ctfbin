const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { authRouter }= require('./routes/auth')

const Cat = require('./models/Cat')

const PORT = process.env.PORT || 5000

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req, res) => {
  const { name } = req.query
  res.send(`Hello ${name}!`)
})

app.use('/auth', authRouter)

app.get('/cats', async (req, res) => {
  const cats = await Cat.find()
  res.send(cats)
})

app.get('/meow', async (req, res) => {
  const cat = new Cat({name: 'meow'})
  await cat.save()
  res.send(cat)
})

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})
