import classes from './edittext.module.css'

import ChevronIcon from '../../icons/ChevronIcon'

export const EditText = (props) => {
  return (
    <div className={classes.container}>
      <input className={classes.input} {...props}/>
      <div className={classes.icon}>
        <ChevronIcon variant="right" />
      </div>
    </div>
  )
}

export default EditText