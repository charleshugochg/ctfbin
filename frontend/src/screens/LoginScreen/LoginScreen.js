import classes from './loginscreen.module.css'

import EditText from '../../components/EditText/EditText'
import Button from '../../components/Button/Button'

export const LoginScreen = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <EditText placeholder="Enter your password" type="password" />
        <Button text="login" />
      </div>
    </div>
  )
}

export default LoginScreen