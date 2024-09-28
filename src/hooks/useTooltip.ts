import { useEffect, useRef } from 'react'
import type { Tooltip } from '../components/root/Tooltip/Tooltip'
import { EVENT_NAMES } from '../consts.d'
import { getElementRef } from '../utils/getElementRef'

export const useTooltip = (message: string, delay = 0) => {
  const elementRef = useRef(null)
  const timeout = useRef<number>()

  const setTooltip = (data: Tooltip['position'] | null) => {
    const detail: Tooltip | null = data ? { message, position: data } : null
    const event = new CustomEvent(EVENT_NAMES.SET_TOOLTIP, { detail })
    document.dispatchEvent(event)
  }

  const startTimeout = (event: MouseEvent) => {
    timeout.current = setTimeout(() => {
      const position = getPosition(event)
      setTooltip(position)
    }, delay)
  }

  const stopTimeout = () => {
    setTooltip(null)
    clearTimeout(timeout.current)
  }

  useEffect(() => {
    const element = getElementRef(elementRef)

    const handlePointerEnter = (e: MouseEvent) => {
      if (delay !== 0) startTimeout(e)
      element.addEventListener('pointermove', handlePointerMove)
    }

    const handlePointerLeave = () => {
      setTooltip(null)
      element.removeEventListener('pointermove', handlePointerMove)
      stopTimeout()
    }

    const handlePointerMove = (e: MouseEvent) => {
      if (delay === 0) {
        const position = {
          top: e.clientY,
          left: e.clientX
        }
        setTooltip(position)
      } else {
        stopTimeout()
        startTimeout(e)
      }
    }

    element.addEventListener('pointerenter', handlePointerEnter)
    element.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      element.removeEventListener('pointerenter', handlePointerEnter)
      element.removeEventListener('pointerleave', handlePointerLeave)
      element.removeEventListener('pointermove', handlePointerMove)
      stopTimeout()
    }
  }, [elementRef.current])

  const getPosition = (event: MouseEvent) => {
    const { clientX, clientY } = event
    return { top: clientY, left: clientX }
  }

  return elementRef
}
