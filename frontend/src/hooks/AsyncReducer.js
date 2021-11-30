import { useReducer, useCallback } from "react"

const actionToState = (_, action) => action

export const useAsyncReducer = (reducer, ...args) => {
  const [state, dispatch] = useReducer(actionToState, ...args)

  const asyncDispatch = useCallback(async action => {
    const result = await reducer(state, action)
    dispatch(result)
  }, [state, dispatch, reducer])

  return [state, asyncDispatch]
}

export default useAsyncReducer