import { useEffect, useRef } from 'react'

export const useCantScrollPage = () => {
  const elementRef = useRef(null)

  useEffect(() => {
    if (!elementRef.current) return
    const element: HTMLElement = elementRef.current

    element.onwheel = e => {
      e.stopPropagation()
    }
    element.onpointerdown = e => {
      e.preventDefault()
      e.stopPropagation()
    }
  }, [elementRef.current])

  return { elementRef }
}
