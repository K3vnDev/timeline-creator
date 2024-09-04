import { useStore } from '../../../store/useStore'
import { Trash as TrashIcon } from '../../root/icons'
import './deleteButton.css'

export const DeleteButton = ({ id }: { id: string }) => {
  const deleteElement = useStore(s => s.deleteElement)

  return (
    <button className='delete-btn' onClick={() => deleteElement(id)}>
      <TrashIcon />
    </button>
  )
}
