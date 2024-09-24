import { useEffect } from 'react'
import { useStore } from '../store/useStore'
import { getElementRef } from '../utils/getElementRef'

export const useFocusOnKey = (
  inputRef: React.MutableRefObject<null>,
  onBottom?: boolean,
  keyIndex?: 0 | 1
) => {
  const timeline = useStore(s => s.timeline)

  useEffect(() => {
    const input = getElementRef<HTMLInputElement>(inputRef)

    const handleKeyDown = (e: KeyboardEvent) => {
      const { key, ctrlKey } = e
      if (!ctrlKey) return

      const keys = ['ArrowUp', 'ArrowDown']
      if (onBottom === undefined && keys.includes(key)) {
        e.preventDefault()
        input.focus()
        return
      }

      if (keyIndex === undefined || onBottom === undefined) return
      const [triggerKey, otherKey] = [keys[keyIndex], keys[+!keyIndex]]

      if ((triggerKey === key && onBottom) || (otherKey === key && !onBottom)) {
        e.preventDefault()
        input.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [timeline])
}
