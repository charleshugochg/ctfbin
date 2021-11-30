import { createContext, useCallback, useEffect, useReducer } from "react";

const initialState = {
  text,
  hidden
}

const defaults = [
  initialState,
  () => {}
]

let timeout

const context = createContext(defaults)

const reducer = (state, action) => {
  switch(action.type) {
    case SHOW_TEXT: {
      const text = action.payload
      return {
        ...state,
        text,
        hidden: false
      }
    }

    case HIDE_TEXT: {
      return {
        ...state,
        hidden: true
      }
    }
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const notify = useCallback(text => {
    dispatch({
      type: SHOW_TEXT,
      payload: text
    })
    timeout = setTimeout(() => {
      dispatch({
        type: HIDE_TEXT
      })
    }, TIMEOUT_INTERVAL)
  }, [state, dispatch])

  useEffect(() => {
    return () => {
      if (timeout)
        clearTimeout(timeout)
    }
  }, [])

  return <context.Provider value={{state, notify}}>{children}</context.Provider>
}

export default context