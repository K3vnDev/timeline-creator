import { useContext, useEffect } from 'react'
import { PointContext } from '../components/create/Point/Point'
import { useStore } from '../store/useStore'
import { getElementRef } from '../utils/getElementRef'

export type FocusingInput = React.MutableRefObject<null> | null

export const useEditPoint = () => {
  const setEditingElement = useStore(s => s.setEditingElement)
  const { elementRef } = useContext(PointContext)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, shiftKey } = event
      const element = getElementRef(elementRef)

      if (key === 'Enter' && (!shiftKey || !element.querySelector('.desc:focus'))) {
        setEditingElement('')
      } else if (key === 'Escape') clearFocusing()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const clearFocusing = () => {
    const element = getElementRef(elementRef)
    const toClearFocus = [...element.querySelectorAll('textarea.desc, input.title')]
    toClearFocus.forEach(el => (el as HTMLInputElement).blur())
  }
}
