import { useEffect } from 'react'
import { APP_NAME, DEFAULT_TIMELINE_NAME } from '../consts.d'
import { useStore } from '../store/useStore'

export const useAppTitle = () => {
  const timeline = useStore(s => s.timeline)

  useEffect(() => {
    if (timeline) {
      const { name } = timeline
      const timelineName = name !== '' ? name : DEFAULT_TIMELINE_NAME
      document.title = `${timelineName} - ${APP_NAME}`
    } else {
      document.title = APP_NAME
    }
  }, [timeline?.name])
}
