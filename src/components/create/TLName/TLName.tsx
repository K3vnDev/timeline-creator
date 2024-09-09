import { useEffect, useRef, useState } from 'react'
import { TIMELINE_DEFAULT_NAME } from '../../../consts.d'
import { useTextInput } from '../../../hooks/useTextInput'
import { useStore } from '../../../store/useStore'
import './tlName.css'
import { useFocusOnClick } from '../../../hooks/useFocusOnClick'
import { Pencil as PencilIcon } from '../../root/icons'

export const TLName = () => {
  const [editing, setEditing] = useState(false)
  const [{ name }, setTimelineName] = useStore(s => [s.timeline, s.setTimelineName])
  const { animation, handleChange } = useTextInput(name, setTimelineName, 30)
  useFocusOnClick('.tl-name', setEditing)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!editing && name === '') {
      setTimelineName(TIMELINE_DEFAULT_NAME)
    }
    recalculateWidth()
  }, [editing])

  const recalculateWidth = () => {
    if (!inputRef.current) return
    const input: HTMLElement = inputRef.current
    input.style.width = '0px'

    const { scrollWidth } = input
    const padding = 15 * 2
    const minWidth = 150

    input.style.width =
      scrollWidth > minWidth - padding ? `${scrollWidth + padding}px` : `${minWidth}px`
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    recalculateWidth()
    handleChange(e)
  }

  const exitEditMode = () => setEditing(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') exitEditMode()
  }

  return (
    <>
      {!editing ? (
        <h1 className='tl-name'>
          {name}
          <PencilIcon />
        </h1>
      ) : (
        <input
          className='tl-name'
          value={name}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          style={{ animation }}
          onBlur={exitEditMode}
          autoFocus
        />
      )}
    </>
  )
}
