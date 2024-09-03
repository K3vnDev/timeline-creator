import { useState } from 'react'
import { useCooldown } from './useCooldown'

export const useCharacterLimit = (maxCharacters: number) => {
  const [animation, setAnimation] = useState('none')
  const animationTime = 0.25

  const [triggerAnimation] = useCooldown({
    action: () => setAnimation(`cant-write ${animationTime}s ease both`),
    reset: () => setAnimation('none'),
    cooldown: animationTime * 1000
  })

  const validateText = (text: string) => {
    if (text.length <= maxCharacters) {
      return true
    }
    triggerAnimation()
    return false
  }

  return { animation, validateText }
}
