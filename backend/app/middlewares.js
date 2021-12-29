const fs = require('fs')
const path = require('path')

const safeFilename = (req, res, next) => {
  const filename = req.params.filename
  if (!/^[A-Za-z0-9.]+$/.test(filename)) {
    return res.status(404).send('Invalid character in the filename.')
  }
  next()
}

const fileExists = (directory) => (req, res, next) => {
  const filename = req.params.filename
  const filePath = path.join(directory, filename)
  if (!fs.existsSync(filePath))
    return res.status(404).send('File not found.')
  req.filePath = filePath
  next()
}

module.exports = {
  safeFilename,
  fileExists
}