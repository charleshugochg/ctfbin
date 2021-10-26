import classes from './flexgrow.module.css'

const FlexGrow = (props) => {
  return (
    <div className={classes.container}>
      {props.children}
    </div>
  )
}

export default FlexGrow