import { useEffect } from 'react'
import { useStore } from '../../../store/useStore'
import { ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon } from '../../root/icons'
import './moveArrows.css'

interface Props {
  id: string
}

export const MoveArrows = ({ id }: Props) => {
  const [moveElement, timeline] = useStore(s => [s.moveElement, s.timeline])
  const index = timeline.findIndex(el => el.id === id)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, shiftKey } = event
      if (!shiftKey || checkFocusingOnInput()) return

      if (key === 'ArrowLeft') moveLeft()
      else if (key === 'ArrowRight') moveRight()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const checkFocusingOnInput = () => Boolean(document.querySelector('input:focus, textarea:focus'))

  const [moveLeft, moveRight] = [() => moveElement(id, -1), () => moveElement(id, 1)]
  const [onLeftEdge, onRightEdge] = [index === 0, index === timeline.length - 1]

  return (
    <div className='move-arrows'>
      <button className='arr-l' onClick={moveLeft} disabled={onLeftEdge}>
        <ArrowLeftIcon />
      </button>
      <button className='arr-r' onClick={moveRight} disabled={onRightEdge}>
        <ArrowRightIcon />
      </button>
    </div>
  )
}
