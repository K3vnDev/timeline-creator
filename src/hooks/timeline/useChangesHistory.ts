import { useEffect, useRef, useState } from 'react'
import { CHANGES_HISTORY_MAX_LENGTH } from '../../consts.d'
import { useStore } from '../../store/useStore'
import type { Timeline } from '../../types.d'
import { useDebounce } from '../useDebounce'

export const useChangesHistory = () => {
  const [timeline, setTimeline] = useStore(s => [s.timeline, s.setTimeline])
  const addingToHistoryTimeline = useDebounce(timeline, 300)
  const justRevertedState = useRef(false)
  const [changesHistory, setChangesHistory] = useState<Timeline[]>([])
  const historyIndex = useRef(0)

  // Add changes to history
  useEffect(() => {
    if (justRevertedState.current) {
      justRevertedState.current = false
      return
    }

    // Delete first state if there are gonna be more than max length
    if (changesHistory.length >= CHANGES_HISTORY_MAX_LENGTH) {
      setChangesHistory(c => {
        const newChangesHistory = structuredClone(c)
        newChangesHistory.splice(0, 1)
        return newChangesHistory
      })
    }

    // Check if history index is not at the end, if thats the case delete all the next states
    if (historyIndex.current !== changesHistory.length - 1) {
      setChangesHistory(c => c.slice(0, historyIndex.current - 1))
    }

    // Push state
    setChangesHistory(c => {
      const newChangesHistory = [...c, addingToHistoryTimeline]
      historyIndex.current = newChangesHistory.length - 1
      return newChangesHistory
    })
  }, [addingToHistoryTimeline])

  useEffect(() => {
    // Revert changes on CTRL Z
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key, ctrlKey, shiftKey } = e

      if (key.toLowerCase() === 'z' && ctrlKey && changesHistory.length > 1) {
        e.preventDefault()

        if (shiftKey && historyIndex.current < changesHistory.length - 1) historyIndex.current++
        else if (!shiftKey && historyIndex.current > 0) historyIndex.current--

        const newState = changesHistory[historyIndex.current]
        setTimeline(newState)
        justRevertedState.current = true
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  })

  // Clear history when another timeline is selected
  useEffect(() => setChangesHistory([]), [timeline.id])
}
