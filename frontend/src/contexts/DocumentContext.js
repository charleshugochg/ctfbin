import { createContext, useEffect } from 'react'
import { getDocuments, getDocument, patchDocument } from '../api/documents'
import { md5hash, diffPatchText } from '../utils'
import useAsyncReducer from '../hooks/AsyncReducer'

export const SET_DOCUMENTS = 'SET_DOCUMENTS'
export const SET_INDEX = 'SET_INDEX'
export const FETCH_DOCUMENT = 'FETCH_DOCUMENT'
export const SAVE_DOCUMENT = 'SAVE_DOCUMENT'
export const SET_TEXT = 'SET_TEXT'

const initialState = {
  currentIndex: null,
  documents: []
}

const defaults = [
  initialState,
  () => {}
]

const context = createContext(defaults)

const reducer = async (state, action) => {
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
      return await reducer(state, {
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

    case FETCH_DOCUMENT: {
      const index = action.payload
      const document = state.documents.length > index && state.documents[index]
      if (!document || document.remoteText !== null)
        return state
      const remoteText = await getDocument(document.name)
      const documents = state.documents.map((d, i) => i !== index ? d : {
        ...d,
        remoteText,
        text: remoteText
      })
      return await reducer(state, {
        type: SET_DOCUMENTS,
        payload: documents
      })
    }

    case SAVE_DOCUMENT: {
      const index = action.payload
      const document = state.documents.length > index && state.documents[index]
      if (!document || document.remoteText === document.text)
        return state
      const hash = md5hash(document.remoteText)
      const patchText = diffPatchText(document.remoteText, document.text)
      const result = await patchDocument(document.name, hash, patchText)
      console.log(result, md5hash(document.text))
    }

    default: {
      return state
    }
  }
}

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
  const [state, dispatch] = useAsyncReducer(reducer, initialState)

  useEffect(() => {
    (async function () {
      const newDocuments = await fetchEmptyDocuments()
      dispatch({
        type: SET_DOCUMENTS,
        payload: newDocuments
      })
    })()
  }, [])

  return <context.Provider value={[state, dispatch]}>{children}</context.Provider>
}

export default context