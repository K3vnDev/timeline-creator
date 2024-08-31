import './tlElement.css'

interface Props {
  children: JSX.Element
}

export const TLElement = ({ children }: Props) => {
  return <span className='tl-element'>{children}</span>
}
