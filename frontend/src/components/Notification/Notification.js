import { useContext } from 'react'

import IconBotton from '../IconButton/IconButton'
import XIcon from '../../icons/XIcon'

import NotificationContext from '../../contexts/NotificationContext'

import classes from './notification.module.css'

const Notification = props => {
  const [state, { hide }] = useContext(NotificationContext)
  return (
    <div className={classes.container}>
      <div className={classes.wrapper} data-disabled={state.hidden} data-warmed={state.warmed}>
        <span>{state.text}</span>
        <IconBotton onClick={hide} className={classes['btn-close']} iconcomponent={<XIcon variant="outline"/>} />
      </div>
    </div>
  )
}

export default Notification