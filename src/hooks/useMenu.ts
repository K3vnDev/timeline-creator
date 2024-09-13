import { useEffect } from 'react'
import { useStore } from '../store/useStore'
import { useFocusOnClick } from './useFocusOnClick'

export const useMenu = () => {
  // biome-ignore format: <>
  const [showingMenu, setShowingMenu, draggingPointerEvents] = 
    useStore(s => [s.showingMenu, s.setShowingMenu, s.pointerEvents])

  useFocusOnClick(
    clickedInside => {
      if (!clickedInside) setShowingMenu(false)
    },
    'pointerdown',
    '.tl-menu',
    '.toggle-menu-btn'
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key, ctrlKey } = e
      if (key.toLowerCase() === 'm' && ctrlKey) setShowingMenu(true)
      if (key === 'Escape') setShowingMenu(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const pointerEvents = showingMenu && draggingPointerEvents === 'auto' ? 'auto' : 'none'
  const className = showingMenu ? 'tl-menu showing' : 'tl-menu'
  const style = { pointerEvents } as React.CSSProperties

  return { style, className }
}
