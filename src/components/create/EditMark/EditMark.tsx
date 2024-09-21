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
  const { handleChange, animation } = useEditMark(text, inputRef)
  useFocusOnKey(inputRef)

  return (
    <>
      <input
        value={text}
        onChange={handleChange}
        placeholder='Mark...'
        style={{ animation }}
        ref={inputRef}
      />
      <div className='options-btns'>
        <DeleteButton id={id} />
        <DuplicateButton />
      </div>
      <MoveArrows id={id} />
    </>
  )
}
