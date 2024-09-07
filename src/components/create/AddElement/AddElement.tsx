import { useEffect, useRef, useState } from 'react'
import { useStore } from '../../../store/useStore'
import { Plus as PlusIcon } from '../../root/icons'
import { TLElement } from '../TLElement/TLElement'
import './addElement.css'

interface Props {
  index: number
}

export const AddElement = ({ index }: Props) => {
  const [createPoint, createMark] = useStore(s => [s.createPoint, s.createMark])
  const [opacity, setOpacity] = useState(0)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (!buttonRef.current) return
    const element: HTMLButtonElement = buttonRef.current

    const { clientWidth: elementWidth, clientHeight: elementHeight } = element
    const { x, y } = element.getBoundingClientRect()
    const [elementX, elementY] = [x + elementWidth / 2, y + elementHeight / 2]

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const distance = Math.sqrt((elementX - clientX) ** 2 + (elementY - clientY) ** 2)

      const [threshold, gap] = [450, 50]
      setOpacity(distance < gap ? 1 : distance < threshold ? 1 - distance / threshold : 0)
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [buttonRef.current])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.shiftKey) createMark(index)
    else createPoint(index)
  }

  return (
    <TLElement>
      <button ref={buttonRef} className='add-element' onClick={handleClick} style={{ opacity }}>
        <PlusIcon />
      </button>
    </TLElement>
  )
}
