import { useTimeline } from '../../../hooks/useTimeline'
import './timeline.css'

export const Timeline = () => {
  const { mappedElements } = useTimeline()

  return <main className='timeline'>{mappedElements}</main>
}
