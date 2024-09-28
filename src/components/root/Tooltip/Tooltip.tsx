import './tooltip.css'
import { useEffect, useState } from 'react'
import { EVENT_NAMES } from '../../../consts.d'

export interface Tooltip {
  message: string
  position: {
    left: number
    top: number
  }
}

export const Tooltip = () => {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null)

  useEffect(() => {
    const handleSetToolTip = (e: Event) => {
      const { detail } = e as CustomEvent
      setTooltip(detail)
    }
    document.addEventListener(EVENT_NAMES.SET_TOOLTIP, handleSetToolTip)
    return () => document.removeEventListener(EVENT_NAMES.SET_TOOLTIP, handleSetToolTip)
  }, [])

  if (!tooltip) return
  const { message, position } = tooltip

  const style = {
    top: `${position.top}px`,
    left: `${position.left}px`
  }

  return (
    <div className='tooltip' style={style}>
      <span>{message}</span>
    </div>
  )
}
