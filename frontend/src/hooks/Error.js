import { useCallback, useState } from "react"

export const useError = () => {
  const [_, setError] = useState()
  return useCallback(e => {
    setError(() => {
      throw e
    })
  }, [setError])
}

export default useError