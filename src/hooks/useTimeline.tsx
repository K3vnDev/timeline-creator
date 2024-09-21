import { useEffect } from 'react'
import { AddElement } from '../components/create/AddElement/AddElement'
import { Mark } from '../components/create/Mark/Mark'
import { Point } from '../components/create/Point/Point'
import { useStore } from '../store/useStore'
import { useFocusOnClick } from './useFocusOnClick'

export const useTimeline = () => {
  // biome-ignore format: <>
  const [timeline, setEditingElement, saveTimeline] = 
    useStore(s => [s.timeline, s.setEditingElement, s.saveTimeline])

  useFocusOnClick(
    clickedInside => {
      if (!clickedInside) setEditingElement('')
    },
    'click',
    '.point',
    '.mark',
    '.add-element'
  )

  // Add changes to Saved Timelines
  useEffect(saveTimeline, [timeline])

  // Map elements
  const mappedElements = (() => {
    const elements = [<AddElement key={-0.5} index={0} />]
    let pointsCount = 0

    for (let i = 0; i < timeline.elements.length; i++) {
      const { type, content, id } = timeline.elements[i]

      elements.push(
        type === 'point' ? (
          <Point content={content} id={id} key={id} onBottom={pointsCount++ % 2 === 0} index={i} />
        ) : (
          <Mark content={content} id={id} key={id} index={i} />
        ),
        <AddElement key={i + 0.5} index={i + 1} />
      )
    }

    return elements
  })()

  return { mappedElements }
}
