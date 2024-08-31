import { useStore } from '../../../store/useStore'
import { Sign } from '../Mark/Mark'
import { Point } from '../Point/Point'
import './timeline.css'

export const Timeline = () => {
  const timeline = useStore(s => s.timeline)
  let pointsCount = 0

  return (
    <main className='timeline'>
      {timeline.map(({ content, type }, index) => {
        if (type === 'point') {
          return <Point content={content} key={index} onBottom={pointsCount++ % 2 === 0} />
        }
        return <Sign content={content} key={index} />
      })}
    </main>
  )
}
