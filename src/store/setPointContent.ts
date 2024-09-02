import type { Timeline } from '../types.d'

interface Params {
  title?: string
  image?: string
  desc?: string
  timeline: Timeline
  index: number
}

export const setPointContent = ({ title, image, desc, timeline, index }: Params) => {
  const newTimeline = structuredClone(timeline)
  const newPoint = timeline[index]
  if (newPoint.type !== 'point') return {}

  if (title !== undefined) newPoint.content.title = title
  if (image !== undefined) newPoint.content.image = image
  if (desc !== undefined) newPoint.content.desc = desc

  newTimeline.splice(index, 1, newPoint)
  return { timeline: newTimeline }
}
