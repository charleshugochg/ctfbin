import classes from './actionbar.module.css'

import ActionSave from './ActionSave'
import ActionDelete from './ActionDelete'

import IconButton from '../IconButton/IconButton'
import DeleteIcon from '../../icons/DeleteIcon'
import { useMatch } from 'react-router'

const Actionbar = (props) => {
  const match = useMatch({ path: '/edit/:name', end: true})
  const { params: { name }} = match || { params: {}}
  return (
    <div className={classes.container}>
      {name && <ActionSave name={name} />}
      {name && <ActionDelete name={name} />}
    </div>
  )
}

export default Actionbar