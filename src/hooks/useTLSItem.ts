import { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/useStore'
import type { HexColor } from '../types.d'
import { getClassName } from '../utils/getClassName'

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

  const selected = timeline && timeline.id === id

  const className = getClassName(
    'tls-item',
    [selected, 'selected'],
    [showingSettings, 'showing-settings'],
    [deleting, 'deleting']
  )

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (e.shiftKey) setDeleting(d => !d)
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
