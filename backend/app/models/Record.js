const db = require('../db')

const recordSchema = db.Schema({
  queryString: String,
  path: String,
  ip: String,
  headerString: String,
}, { toJSON: { virtuals: true }})

recordSchema.virtual('query')
  .get(() => {
    return JSON.parse(this.queryString)
  })
  .set((value) => {
    this.queryString = JSON.stringify(value)
  })

recordSchema.virtual('headers')
  .get(() => {
    return JSON.parse(this.headerString)
  })
  .set((value) => {
    this.headerString = JSON.stringify(value)
  })

const Record = db.model('Record', recordSchema)

module.exports = Record