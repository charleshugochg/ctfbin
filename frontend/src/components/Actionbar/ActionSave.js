import { useDocument } from '../../contexts/DocumentContextV2'
import { useNotification } from '../../contexts/NotificationContext'
import Exception from '../../exceptions'

import SaveIcon from '../../icons/SaveIcon'
import IconButton from '../IconButton/IconButton'

export const ActionSave = ({ name, ...props }) => {
  const [doc, documentActions] = useDocument(name)
  const [_, notificationActions] = useNotification()
  
  const handleClick = async () => {
    try {
      documentActions.saveDocument(name)
    } catch (err) {
      if (err instanceof Exception)
        notificationActions.notify(err.message, true)
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