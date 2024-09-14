import { useEffect, useRef, useState } from 'react'
import { DEFAULT_TIMELINE_NAME } from '../../../consts.d'
import { useStore } from '../../../store/useStore'
import './tlName.css'
import { useFocusOnClick } from '../../../hooks/useFocusOnClick'
import { useTextInput } from '../../../hooks/useTextInput'
import { Pencil as PencilIcon } from '../../root/icons'

export const TLName = () => {
  // biome-ignore format: <>
  const [{ name }, setTimelineName, pointerEvents] = 
    useStore(s => [s.timeline, s.setTimelineName, s.pointerEvents])

  const [editing, setEditing] = useState(false)
  const { animation, handleChange } = useTextInput(name, setTimelineName, 30)
  useFocusOnClick(setEditing, 'click', '.tl-name')
  const inputRef = useRef(null)

  useEffect(() => {
    if (pointerEvents === 'none') setEditing(false)
    if (!editing && name === '') setTimelineName(DEFAULT_TIMELINE_NAME)
    recalculateWidth()
  }, [editing, pointerEvents])

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
        <h1 className='tl-name' style={{ pointerEvents }}>
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
