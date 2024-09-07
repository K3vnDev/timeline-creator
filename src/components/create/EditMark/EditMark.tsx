import { useRef } from 'react'
import './editMark.css'
import { useEditMark } from '../../../hooks/useEditMark'
import { DeleteButton } from '../DeleteButton/DeleteButton'
import { MoveArrows } from '../MoveArrows/MoveArrows'

interface Props {
  text: string
  id: string
}

export const EditMark = ({ id, text }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { trimText, handleChange, animation } = useEditMark(id, text, inputRef)

  return (
    <>
      <input
        onBlur={trimText}
        value={text}
        onChange={handleChange}
        placeholder='Mark...'
        style={{ animation }}
        ref={inputRef}
      />
      <DeleteButton id={id} />
      <MoveArrows id={id} />
    </>
  )
}
