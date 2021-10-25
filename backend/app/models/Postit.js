const db = require('../db')

const postitSchema = db.Schema({
  string: String
})

const Postit = db.model('Postit', postitSchema)

module.exports = Postit