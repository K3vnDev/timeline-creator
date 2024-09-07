import { useEffect } from 'react'

export const useFocusOnKey = (inputRef: React.MutableRefObject<null>, ...keys: Array<string>) => {
  useEffect(() => {
    if (!inputRef.current) return
    const input: HTMLInputElement = inputRef.current

    const handleKeyDown = (e: KeyboardEvent) => {
      const { key, ctrlKey } = e

      if (keys.includes(key) && ctrlKey) {
        e.preventDefault()
        input.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.addEventListener('keydown', handleKeyDown)
  }, [])
}
