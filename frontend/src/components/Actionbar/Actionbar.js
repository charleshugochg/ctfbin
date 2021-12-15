import classes from './actionbar.module.css'

import ActionSave from './ActionSave'

import IconButton from '../IconButton/IconButton'
import DeleteIcon from '../../icons/DeleteIcon'
import { useMatch } from 'react-router'

const Actionbar = (props) => {
  const match = useMatch({ path: '/edit/:name', end: true})
  const { params: { name }} = match || { params: {}}
  return (
    <div className={classes.container}>
      {name && <ActionSave name={name} />}
      <IconButton 
        onClick={()=>{}}
        iconcomponent={<DeleteIcon variant="alternate outline" />} 
        data-disabled={false}/>
    </div>
  )
}

export default Actionbar