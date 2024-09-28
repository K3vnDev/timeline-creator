import { DEFAULT_TIMELINE } from '../consts.d'
import type { Timeline } from '../types.d'
import { getIndex } from './utils/getIndex'

const savedTimelinesFromStorage = JSON.parse(window.localStorage.getItem('saved-timelines'))
export const initialSavedTimelines: Timeline[] = savedTimelinesFromStorage ?? [DEFAULT_TIMELINE]

const editingTimelineIdFromStorage = window.localStorage.getItem('editing-timeline-id')
export const initialEditingTimelineId = editingTimelineIdFromStorage ?? DEFAULT_TIMELINE.id

export const initialTimeline =
  initialSavedTimelines[getIndex(initialSavedTimelines, initialEditingTimelineId)]
