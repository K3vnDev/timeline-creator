import { useEffect } from 'react'
import { DEFAULT_TIMELINE_NAME } from '../consts.d'
import { useStore } from '../store/useStore'

export const useAppTitle = () => {
  const timeline = useStore(s => s.timeline)
  const { name } = timeline

  useEffect(() => {
    const timelineName = name !== '' ? name : DEFAULT_TIMELINE_NAME
    document.title = `${timeline ? `${timelineName} - ` : ''}Timeline Creator`
  }, [name])
}
