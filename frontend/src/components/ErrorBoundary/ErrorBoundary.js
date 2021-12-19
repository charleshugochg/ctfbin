import React from "react";
import { Navigate, useLocation } from "react-router";
import NotificationContext from '../../contexts/NotificationContext'
import { FORBIDDEN, UNAUTHORIZED } from "../../exceptions";

class ErrorBoundary extends React.Component {
  static contextType = NotificationContext

  constructor (props) {
    super(props)
    this.state = {error: {}}
  }

  static getDerivedStateFromError (error) {
    return {error}
  }

  componentDidCatch (error) {
    const [_, { notify }] = this.context
    switch (error.code) {
      case UNAUTHORIZED:
      case FORBIDDEN: {
        break
      }
      default: {
        notify(error.message, true)
      }
    }
  }

  render () {
    const { location } = this.props
    switch (this.state.error.code) {
      case UNAUTHORIZED:
      case FORBIDDEN:
        return <Navigate to="/login" state={{ from: location }} />
      default:
        return this.props.children
    }
  }
}

const Wrapper = (props) => {
  const location = useLocation()
  return <ErrorBoundary location={location} {...props} />
}

export default Wrapper