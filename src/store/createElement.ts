import type { Mark, Point, Timeline } from '../types.d'
import { generateElementId } from '../utils/generateElementId'

export const createElement = (
  index: number,
  timeline: Timeline,
  setEditingElement: (id: string) => void,
  newElementTemplate: Point | Mark
) => {
  const newTimeline = structuredClone(timeline)
  const id = generateElementId(timeline)
  const newElement = { ...structuredClone(newElementTemplate), id }
  newTimeline.splice(index, 0, newElement)
  setEditingElement(id)
  return { timeline: newTimeline }
}
