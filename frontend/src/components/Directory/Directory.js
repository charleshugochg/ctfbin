import classes from './directory.module.css'

import SurfaceContainer from '../SurfaceContainer/SurfaceContainer'

const Directory = props => {
  const { active, fileNames, onSelect } = props
  const numOfFiles = fileNames && fileNames.length

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
      {fileNames && fileNames.map((name, index) => {
        return (
          <div key={name} onClick={() => handleClick(index)} className={classes.file} data-active={index===active}>
            {name}
          </div>
        )
      })}
    </SurfaceContainer>
  )
}

export default Directory