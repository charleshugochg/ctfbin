import classes from './button.module.css'

export const Button = ({text, ...props}) => {
  return (
    <div className={classes.container} {...props}>
      {text}
    </div>
  )
}

export default Button