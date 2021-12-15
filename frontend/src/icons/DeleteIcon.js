import { Icon } from "semantic-ui-react";

const DeleteIcon = props => {
  const { variant, ...iconProps } = props
  const names = ['trash']
  names.push(variant)
  return <Icon name={names.join(' ')} size="large" {...iconProps} />
}

export default DeleteIcon