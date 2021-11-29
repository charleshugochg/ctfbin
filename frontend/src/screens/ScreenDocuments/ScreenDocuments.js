import { useContext } from 'react'
import classes from './screendocuments.module.css'

import Directory from '../../components/Directory/Directory'
import Editor from '../../components/Editor/Editor'

import DocumentContext, { FETCH_DOCUMENT, SET_INDEX, SET_TEXT } from '../../contexts/DocumentContext'
import { useEffect } from 'react'

const ScreenDocuments = props => {
  const [{ 
    currentIndex, 
    documents 
  }, dispatch] = useContext(DocumentContext)
  const filenames = documents.map(({ name }) => name)

  const handleSelect = (index) => {
    dispatch({
      type: SET_INDEX,
      payload: index
    })
  }

  const handleTextChange = (text) => {
    dispatch({
      type: SET_TEXT,
      payload: {
        index: currentIndex,
        text
      }
    })
  }

  useEffect(() => {
    if (currentIndex && !documents[currentIndex].remoteText)
      dispatch({
        type: FETCH_DOCUMENT,
        payload: currentIndex
      })
  }, [currentIndex, documents, dispatch])

  const currentDocument = documents[currentIndex]

  return (
    <div className={classes.container}>
      <Directory fileNames={filenames} active={currentIndex} onSelect={handleSelect} />
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