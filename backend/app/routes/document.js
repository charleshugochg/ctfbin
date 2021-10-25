const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const fs = require('fs')
const router = express.Router()

const PATH = path.join(__dirname, '../documents/')

const { requireAuth } = require('./auth')
router.use(fileUpload({
  safeFileNames: /[^A-Za-z0-9.]/g
}))

router.get('/', async (req, res) => {
  const files = fs.readdirSync(PATH)
  res.send(files)
})

router.use('/', express.static(PATH))

router.post('/', requireAuth, async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }
  const file = req.files.file
  const uploadPath = path.join(PATH, file.name)
  file.mv(uploadPath, (err) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Sorry about that.')
    }
    return res.send('OK')
  })
})

router.delete('/:filename', requireAuth, async (req, res) => {
  const filename = req.params.filename
  if (!/^[A-Za-z0-9.]+$/.test(filename)) {
    return res.status(404).send('Invalid character.')
  }
  const filePath = path.join(PATH, filename)
  try {
    fs.unlinkSync(filePath)
    res.send('OK')
  } catch (err) {
    console.error(err)
    res.status(400).send('Something went wrong!')
  }
})

module.exports = {
  documentRouter: router
}