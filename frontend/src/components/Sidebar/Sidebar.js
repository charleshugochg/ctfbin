import { useState } from 'react'
import MenuButton from '../MenuButton/MenuButton'
import IconCode from '../../icons/IconCode'
import IconBin from '../../icons/IconBin'
import IconChevronLeft from '../../icons/IconChevronLeft'
import IconChevronRight from '../../icons/IconChevronRight'

import classes from './sidebar.module.css'

const Sidebar = props => {
  const [collapse, setCollapse] = useState(false)
  const menuButtonState = collapse ? "collapse" : ""
  const collapseButtonIcon = collapse ? <IconChevronRight /> : <IconChevronLeft />

  const handleToggle = () => {
    setCollapse(!collapse)
  }

  return (
    <div className={classes.container}>
      <MenuButton 
        label={"Documents"} 
        iconcomponent={<IconCode />} 
        data-state={menuButtonState} 
        data-variant="primary"
        data-active/>
      <MenuButton 
        label={"Bin"} 
        iconcomponent={<IconBin />} 
        data-state={menuButtonState} 
        data-variant="primary"/>
      <MenuButton
        onClick={handleToggle}
        style={{
          marginTop: "auto",
          marginBottom: 0
        }}
        label={"Collapse Sidebar"} 
        iconcomponent={collapseButtonIcon} 
        data-state={menuButtonState} 
        data-variant="secondary"/>
    </div>
  )
}

export default Sidebar