import type { Element, Timeline } from '../../types'
import { getIndex } from './getIndex'

type Callback = (elements: Element[], index: number) => Element[] | undefined

export const modifyElements = (timeline: Timeline, id: string, callback: Callback) => {
  const elements = structuredClone(timeline.elements)
  const index = getIndex(elements, id)

  const newElements = callback(elements, index)
  if (!newElements) return {}

  const newTimeline: Timeline = { ...timeline, elements: newElements }
  return { timeline: newTimeline }
}
