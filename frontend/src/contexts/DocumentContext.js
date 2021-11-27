import { createContext, useReducer } from 'react'

const defaults = {
  currentIndex: null,
  documents: [],
  dispatch: () => {}
}

const initialState = {
  currentIndex: null,
  documents: []
}

const context = createContext(defaults)

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export const create = () => {
  return useReducer(reducer, initialState)
}

export default context