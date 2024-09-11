import { useEffect } from 'react'

type EventName = 'click' | 'pointerdown'

export const useFocusOnClick = (
  action: (value: boolean) => void,
  eventName: EventName,
  ...selectors: string[]
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const { target } = e
      if (!target) return

      const clickedInside = selectors.some(selector =>
        Boolean((target as HTMLElement).closest(selector))
      )
      action(clickedInside)
    }

    document.addEventListener(eventName, handleClick)
    return () => document.removeEventListener(eventName, handleClick)
  }, [])
}
