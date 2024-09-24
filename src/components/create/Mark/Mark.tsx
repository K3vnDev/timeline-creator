import { createContext } from 'react'
import { useStore } from '../../../store/useStore'
import { EditMark } from '../EditMark/EditMark'
import { TLElement } from '../TLElement/TLElement'
import './mark.css'
import { getClassName } from '../../../utils/getClassName'

interface Props {
  id: string
  content: { text: string }
  index: number
}

export const Mark = ({ id, index, content: { text } }: Props) => {
  // biome-ignore format: <>
  const [setEditingElement, editingElement, deleteElement] =
    useStore(s => [s.setEditingElement, s.editingElement, s.deleteElement])

  const onEditMode = id === editingElement

  if (!(text || onEditMode)) {
    deleteElement(id)
    return
  }

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    setEditingElement(id)
  }

  const className = getClassName('mark', [onEditMode, 'editing'])

  const providerValue = { id, text }

  return (
    <TLElement index={index}>
      <MarkContext.Provider value={providerValue}>
        <div className={className} onClick={handleClick}>
          {!onEditMode ? <h2>{text}</h2> : <EditMark />}
        </div>
      </MarkContext.Provider>
    </TLElement>
  )
}

export const MarkContext = createContext({
  id: '',
  text: ''
})
