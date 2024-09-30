import { useState } from 'react'
import { getElementRef } from '../utils/getElementRef'
import { useCooldown } from './useCooldown'

export const useValidateText = (maxCharacters: number, inputRef: React.MutableRefObject<null>) => {
  const [animation, setAnimation] = useState('none')
  const animationTime = 0.25

  const [triggerAnimation] = useCooldown({
    action: () => setAnimation(`cant-write ${animationTime}s ease both`),
    reset: () => setAnimation('none'),
    cooldown: animationTime * 1000
  })

  const validateText = (text: string) => {
    const isValid = text.length <= maxCharacters && !text.includes('  ')
    const input = getElementRef<HTMLInputElement>(inputRef)
    const { selectionStart: cursorPos } = input

    if (!isValid) {
      setTimeout(() => {
        const newCursorPos = cursorPos && cursorPos > 0 ? cursorPos - 1 : cursorPos
        input.setSelectionRange(newCursorPos, newCursorPos)
      }, 0)
      triggerAnimation()
    }
    return isValid
  }

  return { animation, validateText }
}
