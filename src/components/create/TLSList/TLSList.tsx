import { useStore } from '../../../store/useStore'
import { TLSItem } from '../TLSItem/TLSItem'
import './tlsList.css'

export const TLSList = () => {
  const savedTimelines = useStore(s => s.savedTimelines)

  return (
    <ul className='tls-list'>
      {savedTimelines.map((_, i) => {
        const timeline = savedTimelines[i]
        return <TLSItem key={timeline.id} timeline={timeline} />
      })}
    </ul>
  )
}
