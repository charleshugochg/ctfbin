import React from 'react'
import classes from './directory.module.css'

import SurfaceContainer from '../SurfaceContainer/SurfaceContainer'
import MenuButton from '../MenuButton/MenuButton'

import IconPlus from '../../icons/IconPlus'

export const Directory = ({ children, ...props }) => {
  const count = React.Children.count(children)
  return (
    <SurfaceContainer className={classes.container}>
      <div className={classes.header}>
        <h3>Files</h3>
        <p>Directory of {count} files</p>
      </div>
      {children}
      <MenuButton
        style={{
          marginTop: "auto",
          marginBottom: 0,
          alignSelf: "center"
        }}
        label={"Create New File"} 
        iconcomponent={IconPlus}
        data-variant="secondary"/>
    </SurfaceContainer>
  )
}

const Item = (props) => {
  const { onClick, active, label, dirty } = props
  const exti = label.lastIndexOf('.')
  const ext = label.slice(exti)
  const name = label.slice(0, exti)
  return (
    <div key={label} onClick={onClick} className={classes.file} data-active={active}>
      <div className={classes.ellipsis} data-filetype={ext}>
        <p>{name}</p>
      </div>
      {dirty &&
        <span>*</span>
      }
    </div>
  )
}

Directory.Item = Item

export default Directory