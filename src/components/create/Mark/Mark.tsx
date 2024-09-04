import { useStore } from '../../../store/useStore'
import { EditMark } from '../EditMark/EditMark'
import { TLElement } from '../TLElement/TLElement'
import './mark.css'

interface Props {
  id: string
  content: { text: string }
  index: number
}

export const Mark = ({ id, index, content: { text } }: Props) => {
  const { setEditingElement, editingElement, deleteElement } = useStore(s => s)
  const onEditMode = id === editingElement

  if (!(text || onEditMode)) {
    deleteElement(id)
    return
  }

  const className = 'mark'
  const handleClick = () => setEditingElement(id)

  return (
    <TLElement index={index}>
      {!onEditMode ? (
        <div className={className} onClick={handleClick}>
          <h4>{text}</h4>
        </div>
      ) : (
        <EditMark className={className} id={id} text={text} />
      )}
    </TLElement>
  )
}
