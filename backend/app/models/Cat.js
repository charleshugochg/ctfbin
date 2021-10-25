const db = require('../db')

const Cat = db.model('Cat', { name: String })

module.exports = Cat