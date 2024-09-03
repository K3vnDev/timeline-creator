import { useEffect, useRef } from 'react'
import { useCharacterLimit } from '../../../hooks/useCharacterLimit'
import { useStore } from '../../../store/useStore'
import './editMark.css'
import { useInputExit } from '../../../hooks/useInputExit'

interface Props {
  text: string
  id: string
  className: string
}

export const EditMark = ({ id, text, className }: Props) => {
  const setMarkText = useStore(s => s.setMarkText)
  const { animation, validateText } = useCharacterLimit(10)
  const inputRef = useRef<HTMLInputElement | null>(null)
  useInputExit({ disabledOnShiftKey: false })

  useEffect(() => {
    inputRef?.current?.focus()
    resizeScroll()
  }, [])

  const resizeScroll = () => {
    const input = inputRef.current
    if (!input) return

    const { scrollWidth } = input
    input.style.width = '0px'
    input.style.width = scrollWidth > 50 ? `${scrollWidth}px` : '60px'
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (validateText(value)) setMarkText(id, value)
    resizeScroll()
  }

  return (
    <div className={`${className} editing`}>
      <input value={text} onChange={handleChange} style={{ animation }} ref={inputRef} />
    </div>
  )
}
