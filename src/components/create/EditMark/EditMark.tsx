import { useContext, useRef } from 'react'
import './editMark.css'
import { useEditMark } from '../../../hooks/useEditMark'
import { useFocusOnKey } from '../../../hooks/useFocusOnKey'
import { DeleteButton } from '../DeleteButton/DeleteButton'
import { DuplicateButton } from '../DuplicateButton/DuplicateButton'
import { MarkContext } from '../Mark/Mark'
import { MoveArrows } from '../MoveArrows/MoveArrows'

export const EditMark = () => {
  const { id, text } = useContext(MarkContext)
  const inputRef = useRef(null)
  const { trimText, handleChange, animation } = useEditMark(id, text, inputRef)
  useFocusOnKey(inputRef)

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
      <div className='options-btns'>
        <DeleteButton id={id} />
        <DuplicateButton id={id} />
      </div>
      <MoveArrows id={id} />
    </>
  )
}
