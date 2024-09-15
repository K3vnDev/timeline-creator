import { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/useStore'
import type { HexColor } from '../types.d'

export const UseTLSItem = (id: string, color: HexColor) => {
  // biome-ignore format: <>
  const [setEditingTimeline, timeline, showingMenu, deleteTimeline] = 
    useStore(s => [s.setEditingTimeline, s.timeline, s.showingMenu, s.deleteTimeline])

  const [showingSettings, setShowingSettings] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    if (!elementRef.current) return
    const element: HTMLElement = elementRef.current

    element.onpointerleave = e => {
      e.stopPropagation()
      setShowingSettings(false)
    }
  }, [elementRef.current])

  useEffect(() => {
    if (deleting) setShowingSettings(false)
  }, [deleting])

  useEffect(() => {
    if (!showingMenu && deleting) deleteTimeline(id)
  }, [showingMenu])

  const className = (() => {
    let c = 'tls-item'
    if (timeline && timeline.id === id) c += ' selected'
    if (showingSettings) c += ' showing-settings'
    if (deleting) c += ' deleting'
    return c
  })()

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (e.shiftKey) setDeleting(true)
    else setEditingTimeline(id)
  }

  const toggleShowingSetting = () => setShowingSettings(s => !s)

  const style = {
    '--prev-color': color
  } as React.CSSProperties

  return {
    className,
    style,
    handleClick,
    showingSettings,
    toggleShowingSetting,
    elementRef,
    deleting,
    setDeleting
  }
}
