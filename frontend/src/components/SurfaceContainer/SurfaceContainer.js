import classes from './surfacecontainer.module.css'

const SurfaceContainer = props => {
  const containerClasses = [classes.container]
  if (props.className)
    containerClasses.push(props.className)
  return (
    <div className={containerClasses.join(' ')}>
      {props.children}
    </div>
  )
}

export default SurfaceContainer