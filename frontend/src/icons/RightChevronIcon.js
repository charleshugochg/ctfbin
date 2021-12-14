import { Icon } from 'semantic-ui-react'

const RightChevronIcon = ({variant = "right", ...props}) => {
  return <Icon name={["chevron"].concat(variant).join(' ')} {...props} />
}

export default RightChevronIcon