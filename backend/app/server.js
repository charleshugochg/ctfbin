const express = require('express')

const Cat = require('./models/Cat')

const app = express()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  const { name } = req.query
  res.send(`Hello ${name}!`)
})

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
