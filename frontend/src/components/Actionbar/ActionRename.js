import { useNavigate } from 'react-router'
import { useDocument } from '../../contexts/DocumentContext'
import useError from '../../hooks/Error'

import EditIcon from '../../icons/EditIcon'
import IconButton from '../IconButton/IconButton'

import { renameDocument } from '../../api/documents'

export const ActionRename = ({ name, ...props }) => {
  const [doc, documentActions] = useDocument(name)
  const setError = useError()
  const navigate = useNavigate()
  
  const handleClick = async () => {
    try {
      const newname = prompt('New Name')
      if (newname) {
        navigate('')
        await renameDocument(name, newname)
        await documentActions.newDocument(newname, doc.text, doc.text)
        await documentActions.removeDocument(name)
        navigate(`/edit/${newname}`)
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