import { useStore } from '../../../store/useStore'
import './tlElement.css'

interface Props {
  children: JSX.Element
  index: number
}

export const TLElement = ({ children, index }: Props) => {
  const timeline = useStore(s => s.timeline)

  const { marginLeft, marginRight }: { marginLeft: string; marginRight: string } = (() => {
    const element = timeline[index]

    if (index === undefined || element?.type === 'point')
      return { marginLeft: '0px', marginRight: '0px' }

    const calcMarkMargin = (direction: 1 | -1) => {
      let margin = element.content.text.length * 10
      const sideElement = timeline[index + direction]
      if (!sideElement || sideElement.type === 'mark') margin /= 3.5
      return `${margin}px`
    }
    return { marginLeft: calcMarkMargin(-1), marginRight: calcMarkMargin(1) }
  })()

  return (
    <span className='tl-element' style={{ marginLeft, marginRight }}>
      {children}
    </span>
  )
}
