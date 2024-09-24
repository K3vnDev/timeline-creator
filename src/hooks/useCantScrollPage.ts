import { useEffect, useRef } from 'react'
import { getElementRef } from '../utils/getElementRef'

export const useCantScrollPage = (enabled = () => true) => {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = getElementRef(elementRef)

    const handleCantScroll = (e: Event) => {
      if (enabled()) e.stopPropagation()
    }
    element.onwheel = handleCantScroll
    element.onpointerdown = handleCantScroll
  }, [elementRef.current, enabled])

  return { elementRef }
}
