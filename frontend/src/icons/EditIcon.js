import { Icon } from "semantic-ui-react";

const EditIcon = props => {
  const { variant, ...iconProps } = props
  const names = ['edit']
  names.push(variant)
  return <Icon name={names.join(' ')} size="large" {...iconProps} />
}

export default EditIcon