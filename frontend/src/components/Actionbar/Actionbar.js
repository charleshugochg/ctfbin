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
      <Item
        onClick={handleSave}
        active={currentDocument && currentDocument.dirty}>
        <IconSave variant="outline" />
      </Item>
    </div>
  )
}

const Item = ({ onClick, children, active, ...props }) => {
  return <IconButton 
        onClick={onclick}
        iconcomponent={children} 
        data-disabled={!active} {...props}/>
}

Actionbar.Item = Item

export default Actionbar