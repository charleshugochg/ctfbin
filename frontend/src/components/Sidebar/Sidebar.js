import { Children, useState } from 'react'
import SurfaceContainer from '../SurfaceContainer/SurfaceContainer'
import MenuButton from '../MenuButton/MenuButton'
import IconChevronLeft from '../../icons/IconChevronLeft'
import IconChevronRight from '../../icons/IconChevronRight'

import classes from './sidebar.module.css'

const Sidebar = props => {
  const [collapse, setCollapse] = useState(false)
  const menuButtonState = collapse ? "collapse" : ""
  const collapseButtonIcon = collapse ? IconChevronRight : IconChevronLeft
  const items = Children.toArray(props.children).filter(c => c.type.name === 'Item')

  const handleToggle = () => {
    setCollapse(!collapse)
  }

  return (
    <SurfaceContainer className={classes.container}>
      {items && items.map(item => {
        const {name, iconcomponent, onClick} = item.props
        return (
          <MenuButton 
            key={name}
            label={name} 
            onClick={onClick}
            iconcomponent={iconcomponent} 
            data-state={menuButtonState} 
            data-active={item.props['data-active']}
            data-variant="primary"/>
        )
      })}
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

const Item = () => {}

Sidebar.Item = Item

export default Sidebar