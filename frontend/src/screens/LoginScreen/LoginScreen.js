import { useState } from 'react'
import classes from './loginscreen.module.css'

import EditText from '../../components/EditText/EditText'
import Button from '../../components/Button/Button'

export const LoginScreen = (props) => {
  const [pwd, setPwd] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log('submitted with pwd', pwd)
  }

  const handleTextChange = (e) => {
    setPwd(() => e.target.value)
  }

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleFormSubmit}>
        <EditText value={pwd} placeholder="Enter your password" type="password" onChange={handleTextChange} />
        <Button text="login" type="submit"/>
      </form>
    </div>
  )
}

export default LoginScreen