import { useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'
import { getIndex } from '../store/utils/getIndex'
import type { Timeline } from '../types.d'
import { getIDBItem, setIDBItem } from '../utils/idbStorage'

export const usePersistState = () => {
  // biome-ignore format: <>
  const [timeline, savedTimelines, setTimeline, setSavedTimelines] = 
    useStore(s => [s.timeline, s.savedTimelines, s.setTimeline, s.setSavedTimelines])
  const initialDataLoaded = useRef(false)

  const loadInitialData = async () => {
    const editingTimelineId: string | undefined = await getIDBItem('editing-timeline-id')
    const savedTimelines: Timeline[] | undefined = await getIDBItem('saved-timelines')

    if (savedTimelines && editingTimelineId) {
      setSavedTimelines(savedTimelines)

      const index = getIndex(savedTimelines, editingTimelineId)
      setTimeline(savedTimelines[index])
    }

    initialDataLoaded.current = true
  }
  // biome-ignore format: <>
  useEffect(() => { loadInitialData() }, [])

  // Save all timelines and editing timeline id
  useEffect(() => {
    if (initialDataLoaded.current) {
      const id = timeline?.id ?? null
      setIDBItem('editing-timeline-id', id)
      setIDBItem('saved-timelines', savedTimelines)
    }
  }, [savedTimelines, timeline?.id])

  return { timeline, savedTimelines }
}
