import { defaultTimeline } from '../consts.d'
import type { Timeline } from '../types.d'
import { getIndex } from './getIndex'

const savedTimelinesFromStorage = JSON.parse(window.localStorage.getItem('saved-timelines'))
export const initialSavedTimelines: Timeline[] = savedTimelinesFromStorage ?? [defaultTimeline]

const editingTimelineIdFromStorage = window.localStorage.getItem('editing-timeline-id')
export const initialEditingTimelineId = editingTimelineIdFromStorage ?? defaultTimeline.id

export const initialTimeline =
  initialSavedTimelines[getIndex(initialSavedTimelines, initialEditingTimelineId)]
