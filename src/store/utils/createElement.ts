import type { Element, Mark, Point, Timeline } from '../../types'
import { generateId } from '../../utils/generateId'

export const createElement = (
  index: number,
  timeline: Timeline,
  setEditingElement: (id: string) => void,
  newElementTemplate: Point | Mark
) => {
  if (index === -1) return {}
  const newElements: Element[] = structuredClone(timeline.elements)
  const id = generateId(newElements)
  const newElement = { ...structuredClone(newElementTemplate), id }
  newElements.splice(index, 0, newElement)
  setEditingElement(id)

  const newTimeline: Timeline = { ...timeline, elements: newElements }
  return { timeline: newTimeline }
}
