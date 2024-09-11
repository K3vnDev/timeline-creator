import { useStore } from '../../../store/useStore'
import type { Timeline } from '../../../types.d'
import { Settings as SettingsIcon } from '../../root/icons'
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

interface TLSItemProps {
  timeline: Timeline
}

const TLSItem = ({ timeline }: TLSItemProps) => {
  return (
    <li className='tls-item'>
      <span>{timeline.name}</span>
      <button>
        <SettingsIcon />
      </button>
    </li>
  )
}
