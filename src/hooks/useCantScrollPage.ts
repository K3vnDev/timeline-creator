import { useEffect, useRef } from 'react'

export const useCantScrollPage = (enabled = () => true) => {
  const elementRef = useRef(null)

  useEffect(() => {
    if (!elementRef.current) return
    const element: HTMLElement = elementRef.current

    const handleCantScroll = (e: Event) => {
      if (enabled()) e.stopPropagation()
    }
    element.onwheel = handleCantScroll
    element.onpointerdown = handleCantScroll
  }, [elementRef.current, enabled])

  return { elementRef }
}
