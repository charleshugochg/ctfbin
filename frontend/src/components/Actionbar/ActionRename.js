import { useNavigate } from 'react-router'
import { useDocument } from '../../contexts/DocumentContext'
import useError from '../../hooks/Error'

import EditIcon from '../../icons/EditIcon'
import IconButton from '../IconButton/IconButton'

export const ActionRename = ({ name, ...props }) => {
  const [_, documentActions] = useDocument(name)
  const setError = useError()
  const navigate = useNavigate()
  
  const handleClick = async () => {
    try {
      const newname = prompt('New Name')
      if (newname) {
        navigate('')
        documentActions.renameDocument(name, newname)
      }
    } catch (err) {
      setError(err)
    }
  }

  return (
    <IconButton 
      onClick={handleClick}
      iconcomponent={<EditIcon variant="outline" />} 
      data-disabled={false}/>
  )
}

export default ActionRename