import { useDocument } from '../../contexts/DocumentContext'
import useError from '../../hooks/Error'
import Exception from '../../exceptions'

import SaveIcon from '../../icons/SaveIcon'
import IconButton from '../IconButton/IconButton'

export const ActionSave = ({ name, ...props }) => {
  const [doc, documentActions] = useDocument(name)
  const setError = useError()
  
  const handleClick = async () => {
    try {
      await documentActions.saveDocument(name)
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