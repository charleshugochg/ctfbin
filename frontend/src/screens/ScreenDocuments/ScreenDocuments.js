import classes from './screendocuments.module.css'

import Directory from '../../components/Directory/Directory'
import Editor from '../../components/Editor/Editor'

import { useDocuments } from '../../hooks/documents'

const ScreenDocuments = props => {
  const { 
    documents, 
    text,
    setText,
    currentIndex, 
    changeDocument 
  } = useDocuments()
  const currentFilename = documents[currentIndex]

  const handleSelect = (index) => {
    changeDocument(index)
  }

  const handleTextChange = (value) => {
    setText(value)
  }

  return (
    <div className={classes.container}>
      <Directory fileNames={documents} active={currentIndex} onSelect={handleSelect} />
      <Editor name={currentFilename} text={text} onChange={handleTextChange} />
    </div>
  )
}

export default ScreenDocuments