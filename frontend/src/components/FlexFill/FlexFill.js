import classes from './flexfill.module.css'

const FlexGrow = (props) => {
  return (
    <div className={classes.container}>
      {props.children}
    </div>
  )
}

export default FlexGrow