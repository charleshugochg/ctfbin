import classes from './screendocuments.module.css'

import Directory from '../../components/Directory/Directory'

const ScreenDocuments = props => {
  return (
    <div className={classes.container}>
      <Directory />
    </div>
  )
}

export default ScreenDocuments