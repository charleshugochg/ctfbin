import { useState } from 'react'
import SurfaceContainer from '../SurfaceContainer/SurfaceContainer'
import MenuButton from '../MenuButton/MenuButton'
import IconChevronLeft from '../../icons/IconChevronLeft'
import IconChevronRight from '../../icons/IconChevronRight'

import classes from './sidebar.module.css'

const Sidebar = props => {
  const [collapse, setCollapse] = useState(true)
  const menuButtonState = collapse ? "collapse" : ""
  const collapseButtonIcon = collapse ? IconChevronRight : IconChevronLeft
  let children = props.children

  if (typeof children === 'function')
    children = children(collapse)

  const handleToggle = () => {
    setCollapse(!collapse)
  }

  return (
    <SurfaceContainer className={classes.container}>
      {children}
      <MenuButton
        onClick={handleToggle}
        style={{
          marginTop: "auto",
          marginBottom: 0,
          alignSelf: "center"
        }}
        label={"Collapse Sidebar"} 
        iconcomponent={collapseButtonIcon} 
        data-state={menuButtonState} 
        data-variant="secondary"/>
    </SurfaceContainer>
  )
}

const Item = (props) => {
  const {name, iconcomponent, onClick, state} = props
  const menuButtonState = state ? "collapse" : ""
  return (
    <MenuButton 
      label={name} 
      onClick={onClick}
      iconcomponent={iconcomponent} 
      data-state={menuButtonState} 
      data-active={props['data-active']}
      data-variant="primary"/>
  )
}

Sidebar.Item = Item

export default Sidebar