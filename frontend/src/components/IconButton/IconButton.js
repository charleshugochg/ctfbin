import classes from './iconbutton.module.css'

const IconButton = (props) => {
  const {
    iconcomponent,
    ...buttonProps
  } = props
  return (
    <div className={classes.container} {...buttonProps}>
      {iconcomponent}
    </div>
  )
}

export default IconButton