const db = require('../db')

const recordSchema = db.Schema({
  query: Object,
  path: String,
  ip: String,
  headers: Object,
})

const Record = db.model('Record', recordSchema)

module.exports = Record