import { useEffect, useRef } from 'react'
import { useCharacterLimit } from '../../../hooks/useCharacterLimit'
import { useStore } from '../../../store/useStore'
import './editMark.css'
import { useInputExit } from '../../../hooks/useInputExit'
import { DeleteButton } from '../DeleteButton/DeleteButton'

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

    input.style.width = '0px'
    const { scrollWidth } = input
    input.style.width = scrollWidth > 90 ? `${scrollWidth}px` : '90px'
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (validateText(value)) setMarkText(id, value)
    resizeScroll()
  }

  return (
    <div className={`${className} editing`}>
      <input
        value={text}
        onChange={handleChange}
        placeholder='Mark...'
        style={{ animation }}
        ref={inputRef}
      />
      <DeleteButton id={id} />
    </div>
  )
}
