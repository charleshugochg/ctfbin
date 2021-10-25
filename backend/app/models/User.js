const db = require('../db')

const userSchema = db.Schema({
  passwordHash: String
})

const User = db.model('User', userSchema)

const init = async () => {
  await User.deleteMany({})
  const admin = new User({
    passwordHash: process.env.PASSWORD_HASH
  }) 
  await admin.save()
}

init()

module.exports = User