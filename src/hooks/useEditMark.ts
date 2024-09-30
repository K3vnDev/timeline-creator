import { useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'
import { getElementRef } from '../utils/getElementRef'
import { useValidateText } from './useValidateText'

export const useEditMark = () => {
  const [setMarkText, setEditingElement] = useStore(s => [s.setMarkText, s.setEditingElement])
  const { animation, triggerAnimation, validateText } = useValidateText(10)
  const inputRef = useRef(null)

  useEffect(() => {
    getElementRef(inputRef).focus()
    recalculateWidth()
  }, [inputRef.current])

  const recalculateWidth = () => {
    const input = getElementRef(inputRef)
    input.style.width = '0px'
    const { scrollWidth } = input
    input.style.width = scrollWidth > 90 ? `${scrollWidth}px` : '90px'
  }

  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      if (key === 'Enter') setEditingElement('')
      else if (key === 'Escape') getElementRef(inputRef).blur()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (validateText(value)) setMarkText(value)
    recalculateWidth()

    const { width } = getElementRef(inputRef).style
    const inputWidth = Number(width.slice(0, -2))

    if (inputWidth > 200) {
      setMarkText(value.slice(0, -1))
      triggerAnimation()
    }
  }

  return { handleChange, animation, inputRef }
}
