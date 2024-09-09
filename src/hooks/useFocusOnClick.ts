import { useEffect } from 'react'

type ToggleValue = (value: boolean) => void

export const useFocusOnClick = (selector: string, toggleValue: ToggleValue) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const { target } = e
      if (!target) return

      const clickedInside = Boolean((target as HTMLElement).closest(selector))
      toggleValue(clickedInside)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])
}
