import { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/useStore'

export const useScrollPageOnDrag = () => {
  const [dragging, setDragging] = useState(false)
  const [setPointerEvents, setShowingMenu] = useStore(s => [s.setPointerEvents, s.setShowingMenu])
  const lastValueX = useRef(0)

  useEffect(() => {
    setDraggingCursor(dragging)

    const handlePointerDown = (e: MouseEvent) => {
      e.stopPropagation()
      if (e.button === 1) {
        e.preventDefault()
        lastValueX.current = e.clientX
        setDragging(true)
      }
    }
    const handlePointerMove = (e: MouseEvent) => {
      e.stopPropagation()
      if (dragging) {
        const moveDiff = e.clientX - lastValueX.current
        lastValueX.current = e.clientX

        const { scrollX } = window
        window.scrollTo({ left: scrollX - moveDiff, behavior: 'instant' })
        setDraggingCursor(true)
      }
    }
    const handlePointerUpOrLeave = () => setDragging(false)

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUpOrLeave)
    document.body.addEventListener('pointerleave', handlePointerUpOrLeave)
    document.addEventListener('wheel', handleScroll)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUpOrLeave)
      document.body.removeEventListener('pointerleave', handlePointerUpOrLeave)
      document.removeEventListener('wheel', handleScroll)
      setDraggingCursor(false)
    }
  }, [dragging])

  const handleScroll = (e: WheelEvent) => {
    const { deltaY: scrollMovement } = e
    const newScrollValue = window.scrollX + scrollMovement
    document.body.scrollLeft = newScrollValue
    window.scrollTo({ left: newScrollValue, behavior: 'instant' })
    setShowingMenu(false)
  }

  const setDraggingCursor = (value: boolean) => {
    if (value) document.body.style.setProperty('cursor', 'grabbing', 'important')
    else document.body.style.removeProperty('cursor')
    setPointerEvents(value ? 'none' : 'auto')
  }
}
