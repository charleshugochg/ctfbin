import classes from './loginscreen.module.css'

import EditText from '../../components/EditText/EditText'

export const LoginScreen = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes['password-field']}>
        <EditText placeholder="Enter your password" type="password" />
      </div>
    </div>
  )
}

export default LoginScreen