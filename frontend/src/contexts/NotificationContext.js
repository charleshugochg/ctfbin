import { createContext, useCallback, useEffect, useReducer } from "react";

const initialState = {
  text: 'something went wrong.',
  hidden: false,
  warmed: true
}

const defaults = {
  state: initialState,
  notify: () => {},
  hide: () => {}
}

const TIMEOUT_INTERVAL = 3000
const SHOW_TEXT = 'SHOW_TEXT'
const HIDE_TEXT = 'HIDE_TEXT'

let timeout

const context = createContext(defaults)

const reducer = (state, action) => {
  switch(action.type) {
    case SHOW_TEXT: {
      const {text, warmed}= action.payload
      return {
        ...state,
        text,
        warmed,
        hidden: false
      }
    }

    case HIDE_TEXT: {
      return {
        ...state,
        hidden: true
      }
    }

    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const notify = useCallback(text => {
    dispatch({
      type: SHOW_TEXT,
      payload: text
    })
    if (timeout)
      clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch({
        type: HIDE_TEXT
      })
    }, TIMEOUT_INTERVAL)
  }, [dispatch])

  const hide = useCallback(() => {
    dispatch({
      type: HIDE_TEXT
    })
  }, [dispatch])

  useEffect(() => {
    return () => {
      if (timeout)
        clearTimeout(timeout)
    }
  }, [])

  return <context.Provider value={{state, notify, hide}}>{children}</context.Provider>
}

export default context