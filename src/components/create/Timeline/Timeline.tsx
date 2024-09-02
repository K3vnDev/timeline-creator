import { useEffect } from 'react'
import { useStore } from '../../../store/useStore'
import { Mark } from '../Mark/Mark'
import { Point } from '../Point/Point'
import './timeline.css'

export const Timeline = () => {
  const { timeline, setEditingIndex } = useStore(s => s)
  let pointsCount = 0

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e?.target as HTMLElement
      if (!target.closest('.point') && !target.closest('.mark')) {
        setEditingIndex(-1)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [setEditingIndex])

  return (
    <main className='timeline'>
      {timeline.map(({ content, type }, index) => {
        if (type === 'point') {
          return (
            <Point content={content} key={index} index={index} onBottom={pointsCount++ % 2 === 0} />
          )
        }
        return <Mark content={content} key={index} index={index} />
      })}
    </main>
  )
}
