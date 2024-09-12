import { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/useStore'
import type { HexColor } from '../types.d'

export const UseTLSItem = (id: string, color: HexColor) => {
  const [setEditingTimeline, timeline] = useStore(s => [s.setEditingTimeline, s.timeline])
  const [showingSettings, setShowingSettings] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    if (!elementRef.current) return
    const element: HTMLElement = elementRef.current

    element.onpointerleave = e => {
      e.stopPropagation()
      setShowingSettings(false)
    }
  }, [elementRef.current])

  const className = (() => {
    let c = 'tls-item'
    if (timeline && timeline.id === id) c += ' selected'
    if (showingSettings) c += ' showing-settings'
    return c
  })()

  const setTimeline = () => setEditingTimeline(id)
  const toggleShowingSetting = () => setShowingSettings(s => !s)

  const style = {
    '--prev-color': color
  } as React.CSSProperties

  return { className, style, setTimeline, showingSettings, toggleShowingSetting, elementRef }
}
