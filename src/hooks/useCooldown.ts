import { useEffect, useRef, useState } from 'react'

interface Params {
  action: () => void
  reset?: () => void
  cooldown: number
}

export function useCooldown({ action, reset, cooldown }: Params): [() => void, boolean] {
  const [waiting, setWaiting] = useState(false)
  const timeout = useRef<number | undefined>()

  useEffect(() => () => clearTimeout(timeout.current), [])

  const triggerAction = () => {
    if (waiting) return

    action()
    setWaiting(true)

    timeout.current = setTimeout(() => {
      if (reset) reset()
      setWaiting(false)
    }, cooldown)
  }

  return [triggerAction, waiting]
}
