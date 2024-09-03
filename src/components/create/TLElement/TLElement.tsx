import './tlElement.css'

interface Props {
  children: JSX.Element
}

export const TLElement = ({ children }: Props) => {
  const type: string = (() => {
    const { className } = children.props
    console.log({ className, children, props: children.props })
    return className ? className.split(' ')[0] : ''
  })()

  return <span className={`tl-element cont-${type}`}>{children}</span>
}
