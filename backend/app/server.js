const express = require('express')

const app = express()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  const { name } = req.query
  res.send(`Hello ${name}!`)
})

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})
