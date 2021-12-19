import { useEffect } from 'react'
import useError from '../../hooks/Error'
import { check } from '../../api/auth'

export const AuthRequire = ({ children, ...props }) => {
  const setError = useError()

  useEffect(() => {
    (async () => {
      try {
        await check()
      } catch (err) {
        setError(err)
      }
    })()
  }, [])

  return children
}