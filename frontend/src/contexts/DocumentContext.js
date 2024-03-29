import { createContext, useEffect, useCallback, useReducer, useContext } from 'react'
import { getDocuments } from '../api/documents'

const ADD_DOCUMENT = 'ADD_DOCUMENT'
const REMOVE_DOCUMENT = 'REMOVE_DOCUMENT'
const SET_TEXT = 'SET_TEXT'

const initialState = {}
const initialActions = {}

const defaults = [
  initialState,
  initialActions
]

const context = createContext(defaults)

const reducer = (state, action) => {
  switch (action.type) {

    case ADD_DOCUMENT: {
      const { name, text, remoteText, dirty } = action.payload
      return {
        ...state,
        [name]: {
          text,
          remoteText,
          dirty
        }
      }
    }

    case REMOVE_DOCUMENT: {
      const { name } = action.payload
      return Object.fromEntries(
        Object.entries(state).filter(([k, _]) => k !== name)
      )
    }

    case SET_TEXT: {
      const { name, text } = action.payload
      const doc = state[name]
      if (!doc) return state
      return {
        ...state,
        [name]: {
          ...doc,
          text,
          dirty: true
        }
      }
    }

    default: {
      return state
    }
  }
}

const makeActions = (state, dispatch) => ({
  newDocument: async function (name, text, remoteText) {
    dispatch({
      type: ADD_DOCUMENT,
      payload: {
        name,
        text,
        remoteText,
        dirty: false
      }
    })
  },
  removeDocument: async function (name) {
    dispatch({
      type: REMOVE_DOCUMENT,
      payload: {
        name
      }
    })
  },
  setText: async function (name, text) {
    dispatch({
      type: SET_TEXT,
      payload: {
        name, text
      }
    })
  },
})

export const DocumentProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useCallback(makeActions, [state, dispatch])(state, dispatch)

  useEffect(() => {
    (async function () {
      const names = await getDocuments()
      names.forEach(name => {
        actions.newDocument(name, '', null) 
      });
    })()
  }, [])

  return <context.Provider value={[state, actions]}>{children}</context.Provider>
}

export const useStatus = () => {
  const [documents] = useContext(context)
  const status = Object.fromEntries(
    Object.entries(documents).map(([name, { dirty }]) => [name, dirty])
  )
  return status
}

export const useDocument = (name) => {
  const [documents, actions] = useContext(context)
  const doc = documents[name] || { text: '', remoteText: null }

  return [
    doc,
    actions
  ]
}

export default {
  useStatus,
  useDocument
}