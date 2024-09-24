import { compress, decompress } from 'compress-json'
import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { useDebounce } from './useDebounce'

export const useShareableTimeline = () => {
  const timeline = useStore(s => s.timeline)
  const debouncedTimeline = useDebounce(timeline, 400)
  const [searchParams, setSearchParams] = useSearchParams()
  const onFirstRender = useRef(true)

  useEffect(() => {
    if (!debouncedTimeline || onFirstRender.current) {
      onFirstRender.current = false
      return
    }
    const { id, ...timeline } = debouncedTimeline

    const compressed = JSON.stringify(compress(timeline))
    const encoded = btoa(compressed)
    setSearchParams({ tl: encoded })
  }, [debouncedTimeline])

  useEffect(() => {
    const timelineFromSearchParams = searchParams.get('tl')
    if (!timelineFromSearchParams) return

    try {
      const decoded = JSON.parse(atob(timelineFromSearchParams))
      const decompressed = decompress(decoded)

      console.log(decompressed)
    } catch {}
  }, [])
}
