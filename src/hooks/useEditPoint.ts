import { useContext, useEffect } from 'react'
import { PointContext } from '../components/create/Point/Point'
import { useStore } from '../store/useStore'

export type FocusingInput = React.MutableRefObject<null> | null

export const useEditPoint = () => {
  const setEditingElement = useStore(s => s.setEditingElement)
  const { elementRef } = useContext(PointContext)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, shiftKey } = event

      switch (key) {
        case 'Escape':
          clearFocusing()
          break
        case 'Enter': {
          const element = getElementRef()
          if (!shiftKey || !element?.querySelector('.desc:focus')) setEditingElement('')
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const getElementRef = () => {
    if (!elementRef.current) return
    return elementRef.current as HTMLElement
  }

  const clearFocusing = () => {
    const element = getElementRef()
    ;(element?.querySelector('.desc') as HTMLInputElement)?.blur()
    ;(element?.querySelector('.title') as HTMLInputElement)?.blur()
  }

  return { elementRef }
}
