const safeFilename = (req, res, next) => {
  const filename = req.params.filename
  if (!/^[A-Za-z0-9.]+$/.test(filename)) {
    return res.status(404).send('Invalid character in the filename.')
  }
  next()
}

module.exports = {
  safeFilename
}