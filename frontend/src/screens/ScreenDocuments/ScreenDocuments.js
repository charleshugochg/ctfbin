import classes from './screendocuments.module.css'

import Directory from '../../components/Directory/Directory'
import Editor from '../../components/Editor/Editor'

import { useDocuments } from '../../hooks/documents'
import { useState } from 'react'
import { useCallback } from 'react/cjs/react.development'

const ScreenDocuments = props => {
  const [index, setIndex] = useState(null)
  const documents = useDocuments()
  const filenames = documents.map(({ name }) => name)
  const currentDocument = documents[index]

  const handleSelect = (index) => {
    setIndex(index)
  }

  const handleTextChange = useCallback((text) => {
    currentDocument.setText(text)
  }, [currentDocument])

  return (
    <div className={classes.container}>
      <Directory fileNames={filenames} active={index} onSelect={handleSelect} />
      <div className={classes['editor-container']}>
        {currentDocument ?
          <Editor name={currentDocument.name} text={currentDocument.getText()} onChange={handleTextChange} /> :
          <h2 className={classes['editor-placeholder']}>Open a file to edit</h2>
        }
      </div>
    </div>
  )
}

export default ScreenDocuments