import { useDocument } from '../../contexts/DocumentContext'
import { useNotification } from '../../contexts/NotificationContext'
import useError from '../../hooks/Error'

import SaveIcon from '../../icons/SaveIcon'
import IconButton from '../IconButton/IconButton'

import { patchDocument, getDocument } from '../../api/documents'
import { md5hash, diffPatchText } from '../../utils'

export const ActionSave = ({ name, ...props }) => {
  const [doc, documentActions] = useDocument(name)
  const [, notificationActions] = useNotification()
  const setError = useError()
  
  const handleClick = async () => {
    try {
      if (!doc) {
        notificationActions.notify('File not exists.')
        return
      }
      let newText = doc.text
      const hash = md5hash(doc.remoteText)
      const patchText = diffPatchText(doc.remoteText, doc.text)
      const result = await patchDocument(name, hash, patchText)
      if (result.hash !== md5hash(doc.text)) {
        notificationActions.notify('Content out of date.', true)
        newText = await getDocument(name)
      }
      await documentActions.newDocument(name, newText, newText)
    } catch (err) {
      setError(err)
    }
  }

  return (
    <IconButton 
      onClick={handleClick}
      iconcomponent={<SaveIcon variant="outline" />} 
      data-disabled={!doc.dirty}/>
  )
}

export default ActionSave