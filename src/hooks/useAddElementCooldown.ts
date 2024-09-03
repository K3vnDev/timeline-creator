import { useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'

export const useAddElementCooldown = () => {
  const setOnAddingElementCooldown = useStore(s => s.setOnAddingElementCooldown)
  const timeout = useRef<number | undefined>()

  const triggerAddElementCooldown = () => {
    setOnAddingElementCooldown(true)
    clearTimeout(timeout.current)

    timeout.current = setTimeout(() => {
      setOnAddingElementCooldown(false)
    }, 250)
  }

  useEffect(() => () => clearTimeout(timeout.current), [])

  return { triggerAddElementCooldown }
}
