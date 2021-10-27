import { useState } from 'react'
import classes from './directory.module.css'

import SurfaceContainer from '../SurfaceContainer/SurfaceContainer'

const Directory = props => {
  const [active, setActive] = useState(1)
  const fileNames = ['index.html', 'server.js', 'README.md']
  const numOfFiles = fileNames.length

  const handleClick = (index) => {
    setActive(index)
    if (props.onChange) {
      props.onChange(index)
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
          <div onClick={() => handleClick(index)} className={classes.file} data-active={index==active}>{name}</div>
        )
      })}
    </SurfaceContainer>
  )
}

export default Directory