import classes from './menubutton.module.css'

const MenuButton = props => {
  const containerClasses = [classes.container]
  const {
    active,
    style,
    iconcomponent,
    ...containerProps
  } = props
  if (active) {
    containerClasses.push(classes.active)
  }
  return (
    <div className={classes.wrapper} style={style}>
      <div className={containerClasses.join(' ')} {...containerProps}>
        {iconcomponent}
        <div className={classes['label-container']}>
          <span className={classes.label}>{props.label}</span>
        </div>
      </div>
    </div>
  )
}

export default MenuButton