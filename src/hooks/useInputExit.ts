import { useEffect } from 'react'
import { useStore } from '../store/useStore'

interface Params {
  exitAction?: () => void
  disabledOnShiftKey: boolean
}

export const useInputExit = ({ exitAction, disabledOnShiftKey }: Params) => {
  const setEditingElement = useStore(s => s.setEditingElement)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'Escape' ||
        (e.key === 'Enter' && ((e.shiftKey && !disabledOnShiftKey) || !e.shiftKey))
      ) {
        if (exitAction) exitAction()
        else setEditingElement('')
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [disabledOnShiftKey, exitAction, setEditingElement])
}
