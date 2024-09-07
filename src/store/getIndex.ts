import type { Timeline } from '../types.d'

export const getIndex = (timeline: Timeline, id: string) => {
  return timeline.findIndex(el => el.id === id)
}
