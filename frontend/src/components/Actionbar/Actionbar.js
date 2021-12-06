import { useContext } from 'react'
import classes from './actionbar.module.css'

import IconButton from '../IconButton/IconButton'
import IconSave from '../../icons/IconSave'

import DocumentContext from '../../contexts/DocumentContext'
import useError from '../../hooks/Error'

const Actionbar = props => {
  const [{
    currentIndex,
    documents
  }, {
    saveDocument,
  }] = useContext(DocumentContext)
  const setError = useError()
  const currentDocument = documents[currentIndex]

  const handleSave = async () => {
    try {
      await saveDocument(currentIndex)
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div className={classes.container}>
      <IconButton 
        onClick={handleSave}
        iconcomponent={<IconSave variant="outline"/>} 
        data-disabled={!currentDocument || !currentDocument.dirty}/>
    </div>
  )
}

export default Actionbar