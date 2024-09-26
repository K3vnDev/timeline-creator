import { useContext } from 'react'
import './editMark.css'
import { useEditMark } from '../../../hooks/useEditMark'
import { useFocusOnKey } from '../../../hooks/useFocusOnKey'
import { ElementOptionsButtons } from '../ElementOptionsButtons/ElementOptionsButtons'
import { MarkContext } from '../Mark/Mark'

export const EditMark = () => {
  const { id, text } = useContext(MarkContext)
  const { handleChange, animation, inputRef } = useEditMark()
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
      <ElementOptionsButtons id={id} />
    </>
  )
}
