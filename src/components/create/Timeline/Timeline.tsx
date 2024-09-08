import { useScrollOnDrag } from '../../../hooks/useScrollOnDrag'
import { useTimeline } from '../../../hooks/useTimeline'
import { useStore } from '../../../store/useStore'
import './timeline.css'

export const Timeline = () => {
  const { mappedElements } = useTimeline()
  const pointerEvents = useStore(s => s.pointerEvents)
  useScrollOnDrag()

  return (
    <main style={{ pointerEvents }} className='timeline'>
      {mappedElements}
    </main>
  )
}
