import classes from './notification.module.css'

import IconBotton from '../IconButton/IconButton'
import IconX from '../../icons/IconX'

const Notification = props => {
  const text = 'notification.'
  return (
    <div className={classes.container}>
      <div className={classes.wrapper} data-disabled="true">
        <span>{text}</span>
        <IconBotton className={classes['btn-close']} iconcomponent={<IconX variant="outline"/>} />
      </div>
    </div>
  )
}

export default Notification