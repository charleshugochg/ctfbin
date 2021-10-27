import React, { Children, useState } from 'react'

const Navigator = props => {
  const screens = Children.toArray(props.children).filter(c => c.type.name === 'Screen')
  const defaultScreen = screens.find(screen => screen.props['data-default'])
  const defaultName = defaultScreen && defaultScreen.props.name
  const [activeScreenName, setActiveScreenName] = useState(defaultName)

  const handleChange = (name) => {
    setActiveScreenName(name)
  }

  let prepends, appends
  if (props.prepend)
    prepends = props.prepend(screens, activeScreenName, handleChange)
  if (props.append)
    appends = props.prepend(screens, activeScreenName, handleChange)

  const screenToRender = screens && screens.find(screen => screen.props.name === activeScreenName)

  return (
    <>
      {prepends}
      {props.screenContainer ?
        <props.screenContainer>
          {screenToRender}
        </props.screenContainer> :
        <>
          {screenToRender}
        </>
      }
      {appends}
    </>
  )
}

const Screen = props => {
  return (
    <>
      {props.component && <props.component />}
    </>
  )
}

Navigator.Screen = Screen

export default Navigator