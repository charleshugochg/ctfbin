import { useContext } from 'react'
import classes from './screendocuments.module.css'

import Directory from '../../components/Directory/Directory'
import Editor from '../../components/Editor/Editor'

import DocumentContext from '../../contexts/DocumentContext'
import { useEffect } from 'react'

const ScreenDocuments = props => {
  const [{ 
    currentIndex, 
    documents 
  }, {
    setIndex,
    setText,
    fetchDocument
  }] = useContext(DocumentContext)
  const currentDocument = documents[currentIndex]

  const handleSelect = (index) => {
    setIndex(index)
  }

  const handleTextChange = (text) => {
    setText(currentIndex, text)
  }

  useEffect(() => {
    if (currentDocument && !currentDocument.remoteText)
      fetchDocument(currentIndex)
  }, [currentIndex])


  return (
    <div className={classes.container}>
      <Directory documents={documents} active={currentIndex} onSelect={handleSelect} />
      <div className={classes['editor-container']}>
        {currentDocument ?
          <Editor name={currentDocument.name} text={currentDocument.text} onChange={handleTextChange} /> :
          <h2 className={classes['editor-placeholder']}>Open a file to edit</h2>
        }
      </div>
    </div>
  )
}

export default ScreenDocuments