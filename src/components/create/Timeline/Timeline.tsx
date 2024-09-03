import { useEffect } from 'react'
import { useStore } from '../../../store/useStore'
import type { Timeline as TimelineType } from '../../../types.d'
import { Mark } from '../Mark/Mark'
import { Point } from '../Point/Point'
import './timeline.css'
import { AddElement } from '../AddElement/AddElement'

export const Timeline = () => {
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

  const mapElements = (timeline: TimelineType) => {
    const elements = [<AddElement key={-0.5} index={0} />]
    let pointsCount = 0

    for (let i = 0; i < timeline.length; i++) {
      const { type, content, id } = timeline[i]

      switch (type) {
        case 'point':
          elements.push(
            <Point id={id} content={content} key={id} onBottom={pointsCount++ % 2 === 0} />
          )
          break
        case 'mark':
          elements.push(<Mark id={id} content={content} key={id} />)
      }

      elements.push(<AddElement key={i + 0.5} index={i + 1} />)
    }

    return elements
  }

  return <main className='timeline'>{mapElements(timeline)}</main>
}
