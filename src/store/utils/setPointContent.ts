import type { Timeline } from '../../types'

interface Values {
  title?: string
  image?: string
  desc?: string
}

export const setPointContent = ({ title, image, desc }: Values, timeline: Timeline, id: string) => {
  const newElements = structuredClone(timeline.elements)
  const index = newElements.findIndex(el => el.id === id)

  const newPoint = newElements[index]
  if (newPoint.type !== 'point') return {}

  if (title !== undefined) newPoint.content.title = title
  if (image !== undefined) newPoint.content.image = image
  if (desc !== undefined) newPoint.content.desc = desc

  newElements.splice(index, 1, newPoint)
  const newTimeline = { ...timeline, elements: newElements }
  return { timeline: newTimeline }
}
