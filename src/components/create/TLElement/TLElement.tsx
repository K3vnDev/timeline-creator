import './tlElement.css'

type Type = 'point' | 'mark' | 'add'

interface Props {
  children: JSX.Element
}

export const TLElement = ({ children }: Props) => {
  const [type]: Type = children.props.className.split(' ')
  return <span className={`tl-element cont-${type}`}>{children}</span>
}
