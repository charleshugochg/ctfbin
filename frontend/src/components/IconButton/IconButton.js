import classes from './iconbutton.module.css'

const IconButton = (props) => {
  const {
    iconcomponent,
    className,
    ...buttonProps
  } = props
  const classNames = [classes.container]
  if (className)
    classNames.push(className)
  return (
    <div className={classNames.join(' ')} {...buttonProps}>
      {iconcomponent}
    </div>
  )
}

export default IconButton