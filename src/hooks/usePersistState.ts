import { useEffect } from 'react'
import { useStore } from '../store/useStore'

export const usePersistState = () => {
  const [timeline, savedTimelines] = useStore(s => [s.timeline, s.savedTimelines])

  // Save editing timeline id
  useEffect(() => {
    window.localStorage.setItem('editing-timeline-id', timeline?.id ?? '')
  }, [timeline])

  // Save all timelines
  useEffect(() => {
    window.localStorage.setItem('saved-timelines', JSON.stringify(savedTimelines ?? []))
  }, [savedTimelines])

  return { timeline }
}
