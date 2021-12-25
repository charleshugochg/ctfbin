import { useNavigate } from 'react-router'
import { useDocument } from '../../contexts/DocumentContext'
import useError from '../../hooks/Error'

import DeleteIcon from '../../icons/DeleteIcon'
import IconButton from '../IconButton/IconButton'

export const ActionDelete = ({ name, ...props }) => {
  const [_, documentActions] = useDocument(name)
  const setError = useError()
  const navigate = useNavigate()
  
  const handleClick = async () => {
    try {
      navigate('')
      await documentActions.deleteDocument(name)
    } catch (err) {
      setError(err)
    }
  }

  return (
    <IconButton 
      onClick={handleClick}
      iconcomponent={<DeleteIcon variant="alternate outline" />} 
      data-disabled={false}/>
  )
}

export default ActionDelete