import React from "react";
import { Navigate } from "react-router";
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
    switch (this.state.error.code) {
      case UNAUTHORIZED:
      case FORBIDDEN:
        return <Navigate to="/login" />
      default:
        return this.props.children
    }
  }
}

export default ErrorBoundary