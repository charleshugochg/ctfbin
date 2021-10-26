import classes from './actionbar.module.css'

import IconButton from '../IconButton/IconButton'
import IconSave from '../../icons/IconSave'

const Actionbar = props => {
  return (
    <div className={classes.container}>
      <IconButton iconcomponent={<IconSave variant="outline"/>} data-disabled/>
    </div>
  )
}

export default Actionbar