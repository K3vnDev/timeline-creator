import type { Timeline } from '../types.d'

interface Values {
  title?: string
  image?: string
  desc?: string
}

export const setPointContent = ({ title, image, desc }: Values, timeline: Timeline, id: string) => {
  const newTimeline = structuredClone(timeline)
  const index = timeline.findIndex(el => el.id === id)

  const newPoint = timeline[index]
  if (newPoint.type !== 'point') return {}

  if (title !== undefined) newPoint.content.title = title
  if (image !== undefined) newPoint.content.image = image
  if (desc !== undefined) newPoint.content.desc = desc

  newTimeline.splice(index, 1, newPoint)
  return { timeline: newTimeline }
}
