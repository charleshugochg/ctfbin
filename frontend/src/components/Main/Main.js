import classes from './main.module.css'

const Main = (props) => {
  return (
    <div className={classes.container}>
      {props.children}
    </div>
  )
}

export default Main