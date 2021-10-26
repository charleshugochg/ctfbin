import React, { Children, useState } from 'react'

const Navigator = props => {
  const screens = Children.toArray(props.children).filter(c => c.type.name === 'Screen') || []
  const defaultScreen = screens.find(screen => screen.props['data-default']) || screens[0]
  const [activeScreenName, setActiveScreenName] = useState(defaultScreen.props.name)

  const handleChange = (name) => {
    setActiveScreenName(name)
  }

  const prepends = props.prepend(screens, activeScreenName, handleChange)

  return (
    <>
      {prepends}
      <props.screenContainer>
        {screens && screens.find(screen => screen.props.name === activeScreenName)}
      </props.screenContainer>
    </>
  )
}

const Screen = props => {
  return <props.component />
}

Navigator.Screen = Screen

export default Navigator