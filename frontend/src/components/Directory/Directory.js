import classes from './directory.module.css'

import SurfaceContainer from '../SurfaceContainer/SurfaceContainer'

const Directory = props => {
  const { active, documents, onSelect } = props
  const numOfFiles = documents && documents.length

  const handleClick = (index) => {
    if (onSelect) {
      onSelect(index)
    }
  }

  return (
    <SurfaceContainer className={classes.container}>
      <div className={classes.header}>
        <h3>Files</h3>
        <p>Directory of {numOfFiles} files</p>
      </div>
      {documents && documents.map((document, index) => {
        const fullname = document.name
        const exti = fullname.lastIndexOf('.')
        const ext = fullname.slice(exti)
        const name = fullname.slice(0, exti)
        return (
          <div key={fullname} onClick={() => handleClick(index)} className={classes.file} data-active={index===active}>
            <div className={classes.ellipsis} data-filetype={ext}>
              <p>{name}</p>
            </div>
            {document && document.dirty &&
              <span>*</span>
            }
          </div>
        )
      })}
    </SurfaceContainer>
  )
}

export default Directory