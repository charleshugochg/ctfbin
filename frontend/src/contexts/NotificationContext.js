import { createContext, useCallback, useContext, useEffect, useReducer } from "react";

const initialState = {
  text: '',
  hidden: true,
  warmed: false
}

const defaults = {
  state: initialState,
  notify: () => {},
  hide: () => {}
}

const TIMEOUT_INTERVAL = 3000
const ANIMATION_DELAY = 100
const SHOW_TEXT = 'SHOW_TEXT'
const HIDE_TEXT = 'HIDE_TEXT'

let timeout

const context = createContext(defaults)

const reducer = (state, action) => {
  switch(action.type) {
    case SHOW_TEXT: {
      const {text, warmed} = action.payload
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

const makeActions = (state, dispatch) => ({
  notify: async function (text, warmed=false) {
    if (timeout) {
      clearTimeout(timeout)
      this.hide()
      timeout = setTimeout(() => this.showfor(text, warmed, TIMEOUT_INTERVAL), ANIMATION_DELAY)
    } else this.showfor(text, warmed, TIMEOUT_INTERVAL)
  },
  showfor: function (text, warmed, duration) {
    dispatch({
      type: SHOW_TEXT,
      payload: {
        text,
        warmed
      }
    })
    if (timeout)
      clearTimeout(timeout)
    timeout = setTimeout(this.hide, duration)
  },
  hide: function () {
    dispatch({
      type: HIDE_TEXT
    })
  }
})

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useCallback(makeActions, [state, dispatch])(state, dispatch)

  useEffect(() => {
    return () => {
      if (timeout)
        clearTimeout(timeout)
    }
  }, [])

  return <context.Provider value={[state, actions]}>{children}</context.Provider>
}

export const useNotification = () => useContext(context)

export default context