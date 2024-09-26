import { useEffect, useState } from 'react'

export const useWindowSize = ({ minWidth = 0, minHeight = 0 }) => {
  const checkOnMinWidth = () => document.documentElement.clientWidth > minWidth
  const checkOnMinHeight = () => document.documentElement.clientHeight > minHeight

  const [onMinWidth, setOnMinWidth] = useState(checkOnMinWidth)
  const [onMinHeight, setOnMinHeight] = useState(checkOnMinHeight)

  const handleResize = () => {
    setOnMinWidth(checkOnMinWidth)
    setOnMinHeight(checkOnMinHeight)
  }

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { onMinWidth, onMinHeight }
}
