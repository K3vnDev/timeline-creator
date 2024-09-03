import { useStore } from '../../../store/useStore'
import { EditMark } from '../EditMark/EditMark'
import { TLElement } from '../TLElement/TLElement'
import './mark.css'

interface Props {
  id: string
  content: { text: string }
}

export const Mark = ({ id, content: { text } }: Props) => {
  const { setEditingElement, editingElement, deleteElement } = useStore(s => s)
  const onEditMode = id === editingElement

  if (!(text || onEditMode)) {
    deleteElement(id)
  }

  const className = 'mark'
  const handleClick = () => setEditingElement(id)

  return (
    <TLElement>
      {!onEditMode ? (
        <div className={className} onClick={handleClick}>
          {text}
        </div>
      ) : (
        <EditMark className={className} id={id} text={text} />
      )}
    </TLElement>
  )
}
