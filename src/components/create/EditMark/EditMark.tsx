import { useContext, useRef } from 'react'
import './editMark.css'
import { useEditMark } from '../../../hooks/useEditMark'
import { useFocusOnKey } from '../../../hooks/useFocusOnKey'
import { DeleteButton } from '../DeleteButton/DeleteButton'
import { MarkContext } from '../Mark/Mark'
import { MoveArrows } from '../MoveArrows/MoveArrows'

export const EditMark = () => {
  const { id, text } = useContext(MarkContext)
  const inputRef = useRef(null)
  useFocusOnKey(inputRef, 'ArrowUp', 'ArrowDown')
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
