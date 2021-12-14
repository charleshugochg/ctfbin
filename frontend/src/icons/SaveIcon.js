import { Icon } from "semantic-ui-react";

const SaveIcon = props => {
  const { variant, ...iconProps } = props
  const names = ['save']
  names.push(variant)
  return <Icon name={names.join(' ')} size="large" {...iconProps} />
}

export default SaveIcon