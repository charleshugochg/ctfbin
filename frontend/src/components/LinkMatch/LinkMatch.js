import { Link, useMatch, useResolvedPath } from 'react-router-dom'

export const LinkMatch = ({ to, exact = false, ...rest }) => {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: exact})

  let {children} = rest
  if (typeof children === 'function')
    children = children(match)
  return (
    <Link
      {...rest}
      to={to}
      children={children}/>
  )
}

export default LinkMatch