import { useStore } from '../../../store/useStore'
import './tlElement.css'

interface Props {
  children: JSX.Element
  index?: number
}

export const TLElement = ({ children, index }: Props) => {
  const timeline = useStore(s => s.timeline)

  const className = (() => {
    const [type]: string = children.props.className.split(' ')
    if (type === 'add-element') return 'tl-element'

    return `tl-element t-${type.charAt(0)}`
  })()

  const { marginLeft, marginRight }: { marginLeft: string; marginRight: string } = (() => {
    if (index === undefined || timeline[index]?.type === 'point')
      return { marginLeft: '0px', marginRight: '0px' }

    const element = timeline[index]

    const calcMarkMargin = (direction: 1 | -1) => {
      let margin = element.content.text.length * 10
      const sideElement = timeline[index + direction]
      if (!sideElement || sideElement.type === 'mark') margin /= 3.5
      return `${margin}px`
    }
    return { marginLeft: calcMarkMargin(-1), marginRight: calcMarkMargin(1) }
  })()

  return (
    <span className={className} style={{ marginLeft, marginRight }}>
      {children}
    </span>
  )
}
