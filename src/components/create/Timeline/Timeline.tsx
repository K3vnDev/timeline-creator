import { useChangesHistory } from '../../../hooks/timeline/useChangesHistory'
import { useDropImageOnBlank } from '../../../hooks/timeline/useDropImageOnBlank'
import { useScrollPageOnDrag } from '../../../hooks/timeline/useScrollPageOnDrag'
import { useTimeline } from '../../../hooks/timeline/useTimeline'
import { useStore } from '../../../store/useStore'
import './timeline.css'

export const Timeline = () => {
  const { mappedElements } = useTimeline()
  const pointerEvents = useStore(s => s.pointerEvents)

  useScrollPageOnDrag()
  useChangesHistory()
  useDropImageOnBlank()

  return (
    <div className='timeline-wrapper'>
      <main style={{ pointerEvents }} className='timeline'>
        {mappedElements}
      </main>
    </div>
  )
}
