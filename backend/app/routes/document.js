const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const fs = require('fs')
const router = express.Router()

const PATH = path.join(__dirname, '../documents/')

const { patch, md5hash } = require('../utils')
const { safeFilename } = require('../middlewares')

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
  if (fs.existsSync(uploadPath))
    return res.status(400).send('File already exists.')
  file.mv(uploadPath, (err) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Sorry about that.')
    }
    return res.send('OK')
  })
})

router.post('/:filename', requireAuth, safeFilename, async (req, res) => {
  const filename = req.params.filename
  const filePath = path.join(PATH, filename)
  if (!fs.existsSync(filePath))
    return res.status(404).send('File not found.')
  const { hash, patchText } = req.body
  const contentBuf = fs.readFileSync(filePath)
  const text = contentBuf.toString()
  if (hash !== md5hash(text))
    return res.status(400).send('Please update the content.')
  const updatedText = patch(text, patchText)
  const updatedHash = md5hash(updatedText)
  fs.writeFile(filePath, updatedText, (err) => {
    if (err)
      return res.status(500).send('Sorry about that.')
    return res.json({hash: updatedHash})
  })
})

router.delete('/:filename', requireAuth, safeFilename, async (req, res) => {
  const filename = req.params.filename
  const filePath = path.join(PATH, filename)
  if (!fs.existsSync(filePath))
    return res.status(404).send('File not found.')
  try {
    fs.unlinkSync(filePath)
    res.send('OK')
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong!')
  }
})

module.exports = {
  documentRouter: router
}