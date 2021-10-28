import classes from './screendocuments.module.css'

import Directory from '../../components/Directory/Directory'
import Editor from '../../components/Editor/Editor'

const ScreenDocuments = props => {
  return (
    <div className={classes.container}>
      <Directory />
      <Editor />
    </div>
  )
}

export default ScreenDocuments