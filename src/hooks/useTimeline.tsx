import { useEffect } from 'react'
import { AddElement } from '../components/create/AddElement/AddElement'
import { Mark } from '../components/create/Mark/Mark'
import { Point } from '../components/create/Point/Point'
import { useStore } from '../store/useStore'

export const useTimeline = () => {
  const { timeline, setEditingElement, onAddingElementCooldown, deleteElement } = useStore(s => s)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e?.target as HTMLElement
      if (
        !target.closest('.point') &&
        !target.closest('.mark') &&
        !target.closest('.add-element') &&
        !onAddingElementCooldown
      ) {
        setEditingElement('')
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [deleteElement, onAddingElementCooldown, setEditingElement])

  const mappedElements = (() => {
    const elements = [<AddElement key={-0.5} index={0} />]
    let pointsCount = 0

    for (let i = 0; i < timeline.length; i++) {
      const { type, content, id } = timeline[i]

      elements.push(
        type === 'point' ? (
          <Point content={content} id={id} key={id} onBottom={pointsCount++ % 2 === 0} index={i} />
        ) : (
          <Mark content={content} id={id} key={id} index={i} />
        )
      )
      elements.push(<AddElement key={i + 0.5} index={i + 1} />)
    }

    return elements
  })()

  return { mappedElements }
}
