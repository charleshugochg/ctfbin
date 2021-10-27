import classes from './menubutton.module.css'

const MenuButton = props => {
  const {
    style,
    iconcomponent,
    ...containerProps
  } = props
  return (
    <div className={classes.wrapper} style={style}>
      <div className={classes.container} {...containerProps}>
        {iconcomponent && <props.iconcomponent />}
        <div className={classes['label-container']}>
          <span className={classes.label}>{props.label}</span>
        </div>
      </div>
    </div>
  )
}

export default MenuButton