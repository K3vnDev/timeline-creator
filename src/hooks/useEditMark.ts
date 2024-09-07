import { useEffect } from 'react'
import { useStore } from '../store/useStore'
import { useCharacterLimit } from './useCharacterLimit'

type InputRef = React.RefObject<HTMLInputElement>

export const useEditMark = (id: string, text: string, inputRef: InputRef) => {
  const [setMarkText, setEditingElement] = useStore(s => [s.setMarkText, s.setEditingElement])
  const { animation, triggerAnimation, validateText } = useCharacterLimit(10)

  useEffect(() => {
    inputRef.current?.focus()
    resizeScroll()
  }, [inputRef.current])

  const resizeScroll = () => {
    const input = inputRef.current
    if (!input) return

    input.style.width = '0px'
    const { scrollWidth } = input
    input.style.width = scrollWidth > 90 ? `${scrollWidth}px` : '90px'
  }

  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      switch (key) {
        case 'Escape':
          inputRef.current?.blur()
          break
        case 'Enter':
          setEditingElement('')
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (validateText(value)) setMarkText(id, value)

    resizeScroll()
    const inputWidth = Number(inputRef?.current?.style.width.slice(0, -2))

    if (inputWidth > 200) {
      setMarkText(id, value.slice(0, -1))
      triggerAnimation()
    }
  }
  const trimText = () => setMarkText(id, text.trim())

  return { trimText, handleChange, animation }
}
