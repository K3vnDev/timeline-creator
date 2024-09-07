import { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'

export type FocusingInput = React.MutableRefObject<null> | null

export const useEditPoint = () => {
  const [focusingInput, setFocusingInput] = useState<FocusingInput>(null)
  const setEditingElement = useStore(s => s.setEditingElement)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, shiftKey } = event

      switch (key) {
        case 'Escape':
          clearFocusing()
          break
        case 'Enter': {
          if (!focusingInput?.current) {
            setEditingElement('')
            break
          }
          const { className }: HTMLElement = focusingInput.current
          if (!(className === 'desc' && shiftKey)) setEditingElement('')
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [focusingInput])

  const checkFocusingElement = (element: React.MutableRefObject<null>) => {
    if (!element.current) return
    const el: HTMLElement = element.current

    el.onfocus = () => setFocusingInput(element)
    el.onblur = () => setFocusingInput(null)
  }

  const clearFocusing = () => {
    if (!focusingInput?.current) return
    ;(focusingInput.current as HTMLElement).blur()
  }

  return { checkFocusingElement }
}
