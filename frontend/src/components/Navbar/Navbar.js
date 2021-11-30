import classes from './navbar.module.css'

import Notification from '../Notification/Notification'

const Navbar = (props) => {
  return (
    <div className={classes.container}>
      <h2>ctfb1n</h2>
      <Notification />
    </div>
  );
}

export default Navbar