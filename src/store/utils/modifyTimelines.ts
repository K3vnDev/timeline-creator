import type { Timeline } from '../../types'
import { getIndex } from './getIndex'

type Callback = (savedTimelines: Timeline[], index: number) => Timeline[] | undefined

export const modifyTimelines = (savedTimelines: Timeline[], id: string, callback: Callback) => {
  const timelines = structuredClone(savedTimelines)
  const index = getIndex(savedTimelines, id)

  const newSavedTimelines = callback(timelines, index)
  if (!newSavedTimelines) return {}

  return { savedTimelines: newSavedTimelines }
}
