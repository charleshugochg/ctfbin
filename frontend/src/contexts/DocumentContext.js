import { createContext, useEffect, useCallback, useReducer, useContext } from 'react'
import { getDocuments, getDocument, patchDocument } from '../api/documents'
import { md5hash, diffPatchText } from '../utils'
import Exception, { CONTENT_OUT_OF_DATE } from '../exceptions'

const SET_DOCUMENTS = 'SET_DOCUMENTS'
const SET_INDEX = 'SET_INDEX'
const SET_TEXT = 'SET_TEXT'

const initialState = {
  currentIndex: null,
  documents: []
}

const defaults = [
  initialState,
  () => {}
]

const context = createContext(defaults)

const reducer = (state, action) => {
  switch (action.type) {

    case SET_DOCUMENTS: {
      const documents = action.payload
      return {
        ...state,
        documents
      }
    }

    case SET_TEXT: {
      const { index, text } = action.payload
      if (!document)
        return state
      const documents = state.documents.map((d, i) => i !== index ? d : {
        ...d,
        dirty: true,
        text
      })
      return reducer(state, {
        type: SET_DOCUMENTS,
        payload: documents
      })
    }

    case SET_INDEX: {
      const index = action.payload
      return {
        ...state,
        currentIndex: index
      }
    }

    default: {
      return state
    }
  }
}

const makeActions = (state, dispatch) => ({
  setDocuments: async function (documents) {
    dispatch({
      type: SET_DOCUMENTS,
      payload: documents
    })
  },
  setText: async function (index, text) {
    dispatch({
      type: SET_TEXT,
      payload: {
        index, text
      }
    })
  },
  setIndex: async function (index) {
    dispatch({
      type: SET_INDEX,
      payload: index
    })
  },
  fetchDocument: async function (index) {
    const document = state.documents.length > index && state.documents[index]
    if (!document)
      return
    const remoteText = await getDocument(document.name)
    const documents = state.documents.map((d, i) => i !== index ? d : {
      ...d,
      dirty: false,
      remoteText,
      text: remoteText
    })
    dispatch({
      type: SET_DOCUMENTS,
      payload: documents
    })
  },
  saveDocument: async function (index) {
    const document = state.documents.length > index && state.documents[index]
    if (!document)
      return
    if (document.remoteText !== document.text) {
      const hash = md5hash(document.remoteText)
      const patchText = diffPatchText(document.remoteText, document.text)
      const result = await patchDocument(document.name, hash, patchText)
      if (result.hash !== md5hash(document.text))
        throw new Exception (CONTENT_OUT_OF_DATE, 'Please update the content.')
    }
    const documents = state.documents.map((d, i) => i !== index ? d : {
      ...d,
      remoteText: d.text,
      dirty: false
    })
    dispatch({
      type: SET_DOCUMENTS,
      payload: documents
    })
  }
})

const fetchEmptyDocuments = async () => {
  const res = await getDocuments()
  const newDocuments = res.map(name => ({
    name,
    dirty: false,
    text: 'Loading...',
    remoteText: null
  }))
  return newDocuments
}

export const DocumentProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useCallback(makeActions, [state, dispatch])(state, dispatch)

  useEffect(() => {
    (async function () {
      const newDocuments = await fetchEmptyDocuments()
      actions.setDocuments(newDocuments)
    })()
  }, [])

  return <context.Provider value={[state, actions]}>{children}</context.Provider>
}

export const useDocuments = () => useContext(context)

export default context