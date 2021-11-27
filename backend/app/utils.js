const { diff_match_patch } = require('diff-match-patch')
const crypto = require('crypto')

const dmp = new diff_match_patch()

const patch = (text, patchText) => {
  const patches = dmp.patch_fromText(patchText)
  const results = dmp.patch_apply(patches, text)
  return results[0]
}

const md5hash = (str) => {
  return crypto.createHash('md5').update(str).digest('hex')
}

module.exports = {
  patch,
  md5hash
}