import crypto from 'crypto'
import { diff_match_patch } from 'diff-match-patch'

const dmp = new diff_match_patch()

export const md5hash = text => {
  return crypto.createHash('md5').update(text).digest('hex')
}

export const diffPatchText = (src, trg) => {
  const diff = dmp.diff_main(src, trg)
  const patches = dmp.patch_make(src, trg, diff)
  return dmp.patch_toText(patches)
}