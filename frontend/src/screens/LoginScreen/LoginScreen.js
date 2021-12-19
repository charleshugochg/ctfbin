import { useState } from 'react'
import { useNavigate } from 'react-router'
import classes from './loginscreen.module.css'

import EditText from '../../components/EditText/EditText'
import Button from '../../components/Button/Button'

import { useNotification } from '../../contexts/NotificationContext'

import { login } from '../../api/auth'
import Exception, { FORBIDDEN } from '../../exceptions'

export const LoginScreen = (props) => {
  const [pwd, setPwd] = useState('')
  const [_, actions] = useNotification()
  const navigate = useNavigate()
  const to = '/'

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(pwd)
      navigate(to)
    } catch (err) {
      if (err instanceof Exception && err.code === FORBIDDEN)
        actions.notify('Wrong password.', true)
      else throw err
    }
  }

  const handleTextChange = (e) => {
    setPwd(() => e.target.value)
  }

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleFormSubmit}>
        <EditText value={pwd} placeholder="Enter your password" type="password" onChange={handleTextChange} />
        <Button text="login" onClick={handleFormSubmit} />
      </form>
    </div>
  )
}

export default LoginScreen